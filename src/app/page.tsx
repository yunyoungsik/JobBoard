import Hero from '@/components/Hero';
import Jobs from '@/components/Jobs';

import {
  getSignInUrl,
  getSignUpUrl,
  getUser,
  signOut,
} from '@workos-inc/authkit-nextjs';
import mongoose from 'mongoose';

export default async function Home() {
  const { user } = await getUser();
  await mongoose.connect(process.env.MONGO_URI as string);
  // const latestJobs = await addOrgAndUserData(
  //   await
  // )

  return (
    <>
      <Hero />
      <Jobs header={''}  />
    </>
  );
}
