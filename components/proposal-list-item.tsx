'use client';

import cx from 'classnames';
import React from 'react';

import type { DaoInfo, ProposalData } from '@/lib/builder';
import { relative } from '@/lib/builder/utils';

type ProposalListItemConfig = {
  dao: DaoInfo;
  proposal: ProposalData;
};

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-200 text-yellow-800',
  active: 'bg-green-200 text-green-800',
  executed: 'bg-green-200 text-green-800',
  defeated: 'bg-red-200 text-red-800',
  canceled: 'bg-red-200 text-red-800',
  queued: 'bg-yellow-200 text-yellow-800',
  unknown: 'bg-gray-200 text-gray-500',
};

export const ProposalListItem = ({ dao, proposal }: ProposalListItemConfig) => {
  const { number, status, title, voteStart, voteEnd } = proposal;
  const { collection } = dao.contracts;

  return (
    <a
      href={`https://nouns.build/dao/base/${collection}/vote/${number}`}
      target="_blank"
      rel="noreferrer"
    >
      <div
        className={`flex flex-col-reverse justify-between gap-3 rounded-lg border border-theme-border p-3 shadow-none transition-shadow hover:shadow-md md:flex-row md:p-5`}
      >
        <div className="flex flex-col">
          <p className="text-xl font-bold leading-snug">{title}</p>
          <p className="text-sm opacity-40">{relative(voteStart)}</p>
        </div>
        <div className="flex flex-row items-center gap-3 md:flex-row-reverse">
          {status && (
            <>
              <p
                className={cx(
                  statusColors[status.toLowerCase() || 'unknown'],
                  'rounded-lg px-3 py-2 text-center text-xs font-bold md:text-base',
                )}
              >
                {status}
              </p>
              {status === 'Active' && (
                <p className="text-sm opacity-40">ends {relative(voteEnd)}</p>
              )}
            </>
          )}
        </div>
      </div>
    </a>
  );
};
