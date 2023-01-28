export interface GlobalProps {
    loading?: boolean;
    register?: {
      firstName?: string,
      lastName?: string,
      ssc_batch?: string,
      email?: string,
      confirm_email?: string,
      password?: string,
      confirm_password?: string,
    };
    auth?: {
      user?: {
        firstName?: string,
        lastName?: string,
        ssc_batch?: string,
        placeOfBirth?: string,
        currentLocation?: string,
        education?: string,
        profession?: string,
        expertise?: string,
        biography?: string,
        socialLinks?: {username: string, domain: string}[],
        status?: string,
        subscription?: string,
        email: string,
        role?: string,
        avatar?: string,
        root?: string,
      },
      token?: string
    };
    users?: []
    
  }