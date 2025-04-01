import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";


import Layout from "~/components/Layout";
import { getUserById } from "~/models/user.server";
import { getUserId } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  const user = userId ? await getUserById(userId) : null;
  return json({ user });
};

export default function Membership() {
  const { user } = useLoaderData<typeof loader>();
  const formStyle = "border-blue flex-1 rounded-md border-2 px-3 text-lg leading-loose text-black";


  return (
    <Layout>
      <div className="px-5 md:px-10 pt-20 text-white">
        <h1>Hi {user?.email}</h1>
        <p>
          Welcome to the Rogue Valley Hang Gliding and Paragliding Association.
        </p>
        <Form method="post">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div>
              <fieldset className="flex w-full flex-col gap-1">
                <legend>Membership Type:</legend>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="membershipType"
                      value="localPilot"
                      required
                      className="h-4 w-4"
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
                    />
                    <span>Visiting Pilot</span>
                  </label>
                </div>
              </fieldset>
            </div>
            <div>
              <label className="flex w-full flex-col gap-1">
                <span>First Name:</span>
                <input
                  name="firstName"
                  required
                  className={formStyle}
                />
              </label>
            </div>

            <div>
              <label className="flex w-full flex-col gap-1">
                <span>Last Name:</span>
                <input
                  name="lastName"
                  required
                  className={formStyle}
                />
              </label>
            </div>

            <div>
              <label className="flex w-full flex-col gap-1">
                <span>USHPA Membership ID:</span>
                <input
                  name="ushpaMembershipId"
                  required
                  className={formStyle}
                />
              </label>
            </div>
            <div>
              <label className="flex w-full flex-col gap-1">
                <span>Paraglider Rating:</span>
                <select
                  name="paragliderRating"
                  required
                  className={formStyle}
                >
                  <option value="P1">P1</option>
                  <option value="P2">P2</option>
                  <option value="P3">P3</option>
                  <option value="P4">P4</option>
                  <option value="P5">P5</option>
                </select>
              </label>
            </div>

            <div>
              <label className="flex w-full flex-col gap-1">
                <span>Hang Glider Rating:</span>
                <select
                  name="hangGliderRating"
                  required
                  className={formStyle}
                >
                  <option value="H1">H1</option>
                  <option value="H2">H2</option>
                  <option value="H3">H3</option>
                  <option value="H4">H4</option>
                  <option value="H5">H5</option>
                </select>
              </label>
            </div>

            <div>
              <label className="flex w-full flex-col gap-1">
                <span>Other Ratings (Instructor, tandem, etc.):</span>
                <input
                  name="otherRatings"
                  className={formStyle}
                />
              </label>
            </div>
            <div>
              <label className="flex w-full flex-col gap-1">
                <span>Email:</span>
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue={user?.email}
                  className={formStyle}
                />
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
                />
              </label>
            </div>

            <div>
              <label className="flex w-full flex-col gap-1">
                <span>Mobile Number:</span>
                <input
                  name="mobileNumber"
                  type="tel"
                  required
                  className={formStyle}
                />
              </label>
            </div>
            <div>
              <fieldset className="flex w-full flex-col gap-1">
                <legend>Option to share phone number</legend>
                <span className="text-sm">Is it OK to share your phone number on the RVHPA website for other members to contact you for coordination or emergencies?</span>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="sharePhone"
                      value="yes"
                      defaultChecked
                      className="border-blue"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="sharePhone" 
                      value="no"
                      className="border-blue"
                    />
                    <span>No</span>
                  </label>
                </div>
              </fieldset>
            </div>
            <div>
              <label className="flex w-full flex-col gap-1">
                <span>Tracker URL:</span>
                <input
                  name="trackerUrl"
                  type="url"
                  required
                  className={formStyle}
                />
              </label>
            </div>
            <div>
              <label className="flex w-full flex-col gap-1">
                <span>Street Address:</span>
                <input
                  name="streetAddress"
                  type="text"
                  required
                  className={formStyle}
                />
              </label>
            </div>
            <div>
              <label className="flex w-full flex-col gap-1">
                <span>Apartment/Suite/Unit (optional):</span>
                <input
                  name="unit"
                  type="text"
                  className={formStyle}
                />
              </label>
            </div>
            <div>
              <label className="flex w-full flex-col gap-1">
                <span>City:</span>
                <input
                  name="city"
                  type="text"
                  required
                  className={formStyle}
                />
              </label>
            </div>
            <div>
              <label className="flex w-full flex-col gap-1">
                <span>State:</span>
                <input
                  name="state"
                  type="text"
                  required
                  className={formStyle}
                />
              </label>
            </div>
            <div>
              <label className="flex w-full flex-col gap-1">
                <span>ZIP Code:</span>
                <input
                  name="zipCode"
                  type="text"
                  required
                  pattern="[0-9]{5}"
                  className={formStyle}
                />
              </label>
            </div>
            <div>
              <label className="flex w-full flex-col gap-1">
                <span>Country:</span>
                <input
                  name="country"
                  type="text"
                  required
                  defaultValue="United States"
                  className={formStyle}
                />
              </label>
            </div>

            <div>
              <label className="flex w-full flex-col gap-1">
                <span>Glider (Make, model, and colors):</span>
                <input
                  name="glider"
                  required
                  className={formStyle}
                />
              </label>
            </div>

            <div>
              <label className="flex w-full flex-col gap-1">
                <span>Emergency Contact Name and Relationship:</span>
                <input
                  name="emergencyContactName"
                  required
                  className={formStyle}
                />
              </label>
            </div>

            <div>
              <label className="flex w-full flex-col gap-1">
                <span>Emergency Contact Phone Number:</span>
                <input
                  name="emergencyContactPhone"
                  type="tel"
                  required
                  className={formStyle}
                />
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
      </div>
    </Layout>
  );
}
