export interface GlobalProps {
  news: {
    currentPage: number;
    totalPage: number;
    searchTerm: string | number;
  };
  notice: {
    currentPage: number;
    totalPage: number;
    searchTerm: string | number;
  };
  searchTerm?: string | number;
  loading?: boolean;
  notify?: { notify?: boolean; msg?: string };
  register?: {
    firstName?: string;
    lastName?: string;
    ssc_batch?: string;
    phone?: string;
    email?: string;
    confirm_email?: string;
    password?: string;
    confirm_password?: string;
    membership?: string;
    currency?: string;
    amount?: number;
  };
  auth?: {
    user?: {
      id: string;
      firstName?: string;
      lastName?: string;
      ssc_batch?: string;
      placeOfBirth?: string;
      dateOfBirth?: string;
      currentLocation?: string;
      education?: {
        school: string;
        current: boolean;
        from: string;
        to: string;
        degree: string;
        description: string;
      }[];
      profession?: {
        position: string;
        company: string;
        description: string;
        current: boolean;
        from: string;
        to: string;
      }[];
      expertise?: string;
      biography?: string;
      socialLinks?: { username: string; domain: string }[];
      status?: string;
      subscription?: string;
      email: string;
      role?: string;
      avatar?: string;
      root?: string;
    };
    token?: string;
  };
  users?: [];
}
