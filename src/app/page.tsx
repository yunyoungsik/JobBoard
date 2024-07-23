import Hero from '@/components/Hero';
import Jobs from '@/components/Jobs';
import { addOrgAndUserData, JobModel } from '@/models/Job';

import {
  getUser,
} from '@workos-inc/authkit-nextjs';
import mongoose from 'mongoose';

export default async function Home() {
  const { user } = await getUser();
  const latestJobs = await addOrgAndUserData(
    await JobModel.find({},{},{limit:5, sort:'-createdAt'}),
    user
  )

  return (
    <>
      <Hero />
      <Jobs header={''} jobs={latestJobs}  />
    </>
  );
}
