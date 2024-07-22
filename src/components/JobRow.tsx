'use client';

import type { Job } from '@/models/Job';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
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
          <img
            src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
            alt="logo"
            className="size-12"
          />
        </div>

        <div className="grow sm:flex">
          <div className="grow">
            <div className="text-gray-500 text-sm">{jobDoc.orgName || undefined}</div>
            <div className="font-bold text-lg mb-1">{jobDoc.title}</div>
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
