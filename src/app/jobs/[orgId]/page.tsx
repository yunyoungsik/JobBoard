import Jobs from '@/components/Jobs';
import { JobModel } from '@/models/Job';
import { getUser } from '@workos-inc/authkit-nextjs';
import { AutoPaginatable, OrganizationMembership, WorkOS } from '@workos-inc/node';
import mongoose from 'mongoose';

type PageProps = {
  params: {
    orgId: string;
  };
};

export default async function CompanyJobsPage(props: PageProps) {
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const org = await workos.organizations.getOrganization(props.params.orgId);
  const {user} = await getUser();
  mongoose.connect(process.env.MONGO_URI as string)
  const jobsDocs = JSON.parse(JSON.stringify(await JobModel.find({orgId: org.id})))
  let oms:AutoPaginatable<OrganizationMembership>|null = null;

  if(user) {
    oms = await workos.userManagement.listOrganizationMemberships({
      userId: user.id,
    })
  }

  for(const job of jobsDocs) {
    const org = await workos.organizations.getOrganization(job.orgId);
    job.orgName = org.name;

    if(oms && oms.data.length > 0) {
      job.isAdmin = !!oms.data.find(om => om.organizationId === job.orgId)
    }
  }

  return (
    <div>
      <div className="container">
        <h1 className="text-xl mb-6">{org.name} jobs</h1>
      </div>

      <Jobs header={"Jobs posted by " + org.name} jobs={jobsDocs} />
    </div>
  );
}
