import { Form } from "@remix-run/react";
import type { UserWithMember } from "~/models/user.server";

interface MembershipFormProps {
  user: UserWithMember | null;
  errors?: Record<string, string>;
  defaultValues?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    emailConfirmation?: string;
  };
}

export default function MembershipForm({ user, errors, defaultValues }: MembershipFormProps) {
  const formStyle = "border-blue flex-1 rounded-md border-2 px-3 text-lg leading-loose text-black";
  const errorStyle = "text-red-500 text-sm mt-1";
  
  const member = user?.member;
  
  return (
    <Form method="post">
      <div className="flex flex-col gap-4 max-w-2xl">
        {errors?.form && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {errors.form}
          </div>
        )}
        {/* <div>
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
                  defaultChecked={defaultValues?.membershipType === "localPilot"}
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
                  defaultChecked={defaultValues?.membershipType === "visitingPilot"}
                />
                <span>Visiting Pilot</span>
              </label>
            </div>
            {errors?.membershipType && (
              <div className={errorStyle}>{errors.membershipType}</div>
            )}
          </fieldset>
        </div> */}
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>First Name:</span>
            <input
              name="firstName"
              required
              className={formStyle}
              defaultValue={defaultValues?.firstName}
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
            />
            {errors?.lastName && (
              <div className={errorStyle}>{errors.lastName}</div>
            )}
          </label>
        </div>

        {/* <div>
          <label className="flex w-full flex-col gap-1">
            <span>USHPA Membership ID:</span>
            <input
              name="ushpaMembershipId"
              required
              className={formStyle}
              defaultValue={defaultValues?.ushpaMembershipId}
            />
            {errors?.ushpaMembershipId && (
              <div className={errorStyle}>{errors.ushpaMembershipId}</div>
            )}
          </label>
        </div> */}
        {/* <div>
          <label className="flex w-full flex-col gap-1">
            <span>Paraglider Rating:</span>
            <select
              name="paragliderRating"
              required
              className={formStyle}
              defaultValue={defaultValues?.paragliderRating}
            >
              <option value="na">N/A</option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
              <option value="P3">P3</option>
              <option value="P4">P4</option>
              <option value="P5">P5</option>
            </select>
            {errors?.paragliderRating && (
              <div className={errorStyle}>{errors.paragliderRating}</div>
            )}
          </label>
        </div>

        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Hang Glider Rating:</span>
            <select
              name="hangGliderRating"
              required
              className={formStyle}
              defaultValue={defaultValues?.hangGliderRating}
            >
              <option value="na">N/A</option>
              <option value="H1">H1</option>
              <option value="H2">H2</option>
              <option value="H3">H3</option>
              <option value="H4">H4</option>
              <option value="H5">H5</option>
            </select>
            {errors?.hangGliderRating && (
              <div className={errorStyle}>{errors.hangGliderRating}</div>
            )}
          </label>
        </div> */}

        {/* <div>
          <label className="flex w-full flex-col gap-1">
            <span>Other Ratings (Instructor, tandem, etc.):</span>
            <input
              name="otherRatings"
              className={formStyle}
              defaultValue={defaultValues?.otherRatings}
            />
          </label>
        </div> */}
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Email:</span>
            <input
              name="email"
              type="email"
              required
              defaultValue={defaultValues?.email || user?.email}
              className={formStyle}
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

        {/* <div>
          <label className="flex w-full flex-col gap-1">
            <span>Mobile Number:</span>
            <input
              name="mobileNumber"
              type="tel"
              required
              className={formStyle}
              defaultValue={defaultValues?.mobileNumber}
            />
            {errors?.mobileNumber && (
              <div className={errorStyle}>{errors.mobileNumber}</div>
            )}
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
                  defaultChecked={defaultValues?.sharePhone === "yes"}
                  className="border-blue"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sharePhone" 
                  value="no"
                  defaultChecked={defaultValues?.sharePhone === "no"}
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
              defaultValue={defaultValues?.trackerUrl}
            />
            {errors?.trackerUrl && (
              <div className={errorStyle}>{errors.trackerUrl}</div>
            )}
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
              defaultValue={defaultValues?.streetAddress}
            />
            {errors?.streetAddress && (
              <div className={errorStyle}>{errors.streetAddress}</div>
            )}
          </label>
        </div>
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Apartment/Suite/Unit (optional):</span>
            <input
              name="unit"
              type="text"
              className={formStyle}
              defaultValue={defaultValues?.unit}
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
              defaultValue={defaultValues?.city}
            />
            {errors?.city && (
              <div className={errorStyle}>{errors.city}</div>
            )}
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
              defaultValue={defaultValues?.state}
            />
            {errors?.state && (
              <div className={errorStyle}>{errors.state}</div>
            )}
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
              defaultValue={defaultValues?.zipCode}
            />
            {errors?.zipCode && (
              <div className={errorStyle}>{errors.zipCode}</div>
            )}
          </label>
        </div>
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Country:</span>
            <input
              name="country"
              type="text"
              required
              defaultValue={defaultValues?.country || "United States"}
              className={formStyle}
            />
            {errors?.country && (
              <div className={errorStyle}>{errors.country}</div>
            )}
          </label>
        </div>

        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Glider (Make, model, and colors):</span>
            <input
              name="glider"
              required
              className={formStyle}
              defaultValue={defaultValues?.glider}
            />
            {errors?.glider && (
              <div className={errorStyle}>{errors.glider}</div>
            )}
          </label>
        </div>

        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Emergency Contact Name and Relationship:</span>
            <input
              name="emergencyContactName"
              required
              className={formStyle}
              defaultValue={defaultValues?.emergencyContactName}
            />
            {errors?.emergencyContactName && (
              <div className={errorStyle}>{errors.emergencyContactName}</div>
            )}
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
              defaultValue={defaultValues?.emergencyContactPhone}
            />
            {errors?.emergencyContactPhone && (
              <div className={errorStyle}>{errors.emergencyContactPhone}</div>
            )}
          </label>
        </div> */}

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
