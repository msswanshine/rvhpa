import { json, LoaderFunctionArgs, ActionFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";

import MembershipForm from "~/components/Forms/Membership";
import Layout from "~/components/Layout";
import { getUserById, createMember, updateMember, type UserWithMember } from "~/models/user.server";
import { getUserId } from "~/session.server";

interface MembershipFormData {
  firstName: string;
  lastName: string;
  email: string;
  emailConfirmation: string;
}

interface LoaderData {
  user: UserWithMember | null;
}

interface ActionData {
  errors?: Record<string, string>;
  data?: MembershipFormData;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect("/login");
  }
  const user = await getUserById(userId);
  return json<LoaderData>({ user });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await getUserId(request);
  if (!userId) {
    return json<ActionData>(
      { errors: { form: "You must be logged in to submit a membership application." } },
      { status: 401 }
    );
  }

  const formData = await request.formData();
  const rawData = Object.fromEntries(formData);
  const data: MembershipFormData = {
    firstName: String(rawData.firstName || ""),
    lastName: String(rawData.lastName || ""),
    email: String(rawData.email || ""),
    emailConfirmation: String(rawData.emailConfirmation || ""),
  };

  // Validate required fields
  const errors: Record<string, string> = {};
  
  if (!data.firstName) {
    errors.firstName = "First name is required";
  }
  if (!data.lastName) {
    errors.lastName = "Last name is required";
  }
  if (!data.email) {
    errors.email = "Email is required";
  } else if (!data.email.includes("@")) {
    errors.email = "Please enter a valid email address";
  }
  if (data.email !== data.emailConfirmation) {
    errors.emailConfirmation = "Email addresses do not match";
  }

  if (Object.keys(errors).length > 0) {
    return json<ActionData>({
      errors,
      data,
    }, { status: 400 });
  }

  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const memberData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    };

    if (user.member) {
      await updateMember(userId, memberData);
    } else {
      await createMember(userId, memberData);
    }

    return redirect("/membership/success");
  } catch (error) {
    console.error("Error processing membership:", error);
    return json<ActionData>({
      errors: { 
        form: "An error occurred while processing your membership. Please try again." 
      },
      data,
    }, { status: 500 });
  }
};

export default function Membership() {
  const { user } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <Layout>
      <div className="px-5 md:px-10 pt-20 text-white">
        <h1>Hi {user?.email}</h1>
        <p>
          Welcome to the Rogue Valley Hang Gliding and Paragliding Association.
          {user?.member ? " Update your membership details below." : " Complete the form below to become a member."}
        </p>
        <div className="flex flex-row justify-evenly gap-4 bg-white rounded-lg p-4 text-black">
          <MembershipForm 
            user={user} 
            member={user?.member} 
            errors={actionData?.errors} 
            defaultValues={actionData?.data} 
          />
          <div>
            <h2>Current Membership Details:</h2>
            <p>
              {user?.member?.firstName} {user?.member?.lastName}
            </p>
            <p>
              {user?.member?.email}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
