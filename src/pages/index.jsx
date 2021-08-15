import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Loading } from '../components';

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    router.push('/login');
  }, []);

  return <Loading />;
}
