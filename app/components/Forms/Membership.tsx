/* eslint-disable react/jsx-no-leaked-render */
import { Form } from "@remix-run/react";

import type { UserWithMember } from "~/models/user.server";

interface MembershipFormProps {
  user: UserWithMember | null;
  errors?: Record<string, string>;
  defaultValues?: {
    membershipType?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    emailConfirmation?: string;
  };
}

export default function MembershipForm({ user, errors, defaultValues }: MembershipFormProps) {
  const formStyle = "border-blue flex-1 rounded-md border-2 px-3 text-lg leading-loose text-black";
  const errorStyle = "text-red-500 text-sm mt-1";
  
  return (
    <Form method="post">
      <div className="flex flex-col gap-4 max-w-2xl">
        {errors?.form && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {errors.form}
          </div>
        )}

        <div>
          <fieldset className="flex w-full flex-col gap-1">
            {/* TODO: Log this field into place until the membershipExpirationDate has passed, and the user can reassign 
            This should also be attached to a "membership renewal" button that will be visible to the user when the membershipExpirationDate has passed, which 
            will allow them to renew their membership and pay for the next year. */}
            <legend>Membership Type:</legend>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="membershipType"
                  value="localPilot"
                  required
                  className="h-4 w-4"
                  defaultChecked={user?.member?.membershipType === "localPilot" ? true : false}
                />
                <span>Local Pilot</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="membershipType" 
                  value="visitingPilot"
                  required
                  className="h-4 w-4"
                  defaultChecked={user?.member?.membershipType === "visitingPilot" ? true : false}
                />
                <span>Visiting Pilot</span>
              </label>
            </div>
            {errors?.membershipType && (
              <div className={errorStyle}>{errors.membershipType}</div>
            )}
          </fieldset>
        </div>

        <div>
          <label className="flex w-full flex-col gap-1">
            <span>First Name:</span>
            <input
              name="firstName"
              required
              className={formStyle}
              defaultValue={defaultValues?.firstName}
              value={user?.member?.firstName}
            />
            {errors?.firstName && (
              <div className={errorStyle}>{errors.firstName}</div>
            )}
          </label>
        </div>

        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Last Name:</span>
            <input
              name="lastName"
              required
              className={formStyle}
              defaultValue={defaultValues?.lastName}
              value={user?.member?.lastName}
            />
            {errors?.lastName && (
              <div className={errorStyle}>{errors.lastName}</div>
            )}
          </label>
        </div>
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Email:</span>
            <input
              name="email"
              type="email"
              required
              defaultValue={defaultValues?.email || user?.email}
              className={formStyle}
              value={user?.member?.email}
            />
            {errors?.email && (
              <div className={errorStyle}>{errors.email}</div>
            )}
          </label>
        </div>

        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Confirm Email:</span>
            <input
              name="emailConfirmation" 
              type="email"
              required
              className={formStyle}
              defaultValue={defaultValues?.emailConfirmation}
            />
            {errors?.emailConfirmation && (
              <div className={errorStyle}>{errors.emailConfirmation}</div>
            )}
          </label>
        </div>

        

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue hover:bg-blue-80 rounded px-4 py-2 text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </Form>
  );
}
