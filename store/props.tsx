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
    auth?: {};
    users?: []
    
  }