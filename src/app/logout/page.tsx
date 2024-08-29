"use client"

import { useRouter } from 'next/navigation'
import { destroyCookie } from 'nookies';

export default function LogoutPage(req: any, res: any) {

  const router = useRouter();

  async function pushRoute() {
    router.push('/');
  }
  
  destroyCookie({ res }, 'mz-auth-token.access_token');
  destroyCookie({ res }, 'mz-auth-token.session_id');
  pushRoute();
}


