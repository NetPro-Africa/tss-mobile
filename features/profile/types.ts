export type UpdateProfileType = {
  phone: string;
  profesion: string;
  address: string;
  city: string;
  states: string;
  address2?: string;
};

export type UpdateProfileTypeResponse = {
  success: true;
  message: string;
  data: UpdateProfileType;
};

export type ProfileType = {
  data: {
    address: string;
    fatherphone: string;
    fathersjob: string;
    fathersname: string;
    id: number;
    motherphone: string;
    mothersjob: string;
    mothersname: string;
    pemailaddress: string;
    status: string;
    user: {
      address: string;
      country_id: number;
      created_by: number;
      created_date: string;
      department_id: number;
      dob: string;
      fname: string;
      gender: string;
      id: number;
      lname: string;
      mname: string | null;
      otp_code: string | null;
      otp_expires: string | null;
      passport: string | null;
      phone: string;
      profile: string;
      role_id: number;
      state_id: number;
      username: string;
      userstatus: string;
      useruniquid: string;
      verification_key: string | null;
    };
  };
  userId: number;
  message: string;
  meta: { timestamp: string; version: string };
  success: boolean;
};

export type GetProfileResponseType = {
  success: boolean;
  message: string;
  meta: {
    timestamp: string;
    version: string;
  };
  data: ProfileType;
};
