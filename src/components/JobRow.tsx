'use client';

import type { Job } from '@/models/Job';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import TimeAgo from 'react-timeago';

export default function JobRow({ jobDoc }: { jobDoc: Job }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm relative">
      <div className="absolute top-4 right-4 cursor-pointer">
        <FontAwesomeIcon icon={faHeart} className="size-4 text-gray-300" />
      </div>
      <div className="flex grow gap-4">
        <div className="content-center">
          {jobDoc.jobIcon && (
            <Image
              src={jobDoc.jobIcon}
              alt="logo"
              width={50}
              height={50}
              className="size-12 rounded-full ring-1 ring-gray-200"
            />
          )}
        </div>

        <div className="grow sm:flex">
          <div className="grow">
            <div>
              <Link href={`/jobs/${jobDoc.orgId}`} className="hover:underline text-gray-500 text-sm">
                {jobDoc.orgName || '-'}
              </Link>
            </div>
            <div className="font-bold text-lg mb-1">
              <Link href={`/show/${jobDoc._id}`} className="hover:underline">
                {jobDoc.title}
              </Link>
            </div>
            <div className="text-gray-400 text-sm capitalize">
              {jobDoc.remote} &middot; {jobDoc.city}, {jobDoc.country} &middot; {jobDoc.type}-time
              {jobDoc.isAdmin && (
                <>
                  {' '}
                  &middot; <Link href={`/jobs/edit/${jobDoc._id}`}>Edit</Link> &middot;{' '}
                  <button
                    type="button"
                    onClick={async () => {
                      await axios.delete('/api/jobs?id=' + jobDoc._id);
                      window.location.reload();
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>

          {jobDoc.createdAt && (
            <div className="content-end text-gray-600 text-sm">
              <TimeAgo date={jobDoc.createdAt} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
