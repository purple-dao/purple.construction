/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useMemo } from 'react';

import type { ComponentConfig } from '@/lib/builder';
import { useDao, useProposals } from '@/lib/builder';
import { DAO_CONFIG } from '@/lib/config';

import { ProposalListItem } from './proposal-list-item';
import { MiniAppLink } from './mini-app-link';

export const ProposalList = ({ opts = {} }: ComponentConfig) => {
  // const theme = opts?.theme;
  const sortDirection = opts?.sortDirection?.toUpperCase() || 'DESC';
  const maxProposals = Number(opts?.max) || 10;

  const dao = useDao();
  const { data: proposals, isLoading } = useProposals(dao || undefined);
  const sortedProposals = useMemo(() => {
    if (!proposals) return undefined;
    if (sortDirection === 'ASC') return [...proposals].sort((a, b) => a.created - b.created);
    return proposals;
  }, [proposals, sortDirection]);

  console.log(isLoading);
  if (isLoading) {
    return (
      <div id="proposal-list" className="flex flex-col gap-6">
        <img src="/loading-noggles.gif" alt="loading" />
      </div>
    );
  }

  if (!sortedProposals?.length) {
    return (
      <div id="proposal-list" className="flex flex-col gap-6">
        <p>No proposals found</p>
      </div>
    );
  }

  if (!dao) return null;

  return (
    <div>
      <div id="proposal-list" className="flex flex-col gap-6">
        {sortedProposals.map((proposal: any, i: number) => {
          if (maxProposals && i >= maxProposals) return null;
          return <ProposalListItem key={proposal.id} dao={dao} proposal={proposal} />;
        })}
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-center justify-center my-4 pt-6">
        <div className="flex justify-center w-full md:w-auto">
          <MiniAppLink
            href={`https://nouns.build/dao/base/${DAO_CONFIG.token}?tab=activity`}
            className="w-full md:w-auto"
          >
            <p className="rounded-md border border-theme-border p-3 shadow-none transition-shadow hover:shadow-md text-center md:text-left w-full md:w-auto">
              View all proposals on Base
            </p>
          </MiniAppLink>
        </div>
        <div className="flex justify-center w-full md:w-auto">
          {/* this token ID was the last one issued on mainnet */}
          <MiniAppLink
            href={`https://nouns.build/dao/ethereum/${DAO_CONFIG.v1Token}/478?tab=activity`}
            className="w-full md:w-auto"
          >
            <p className="rounded-md border border-theme-border p-3 shadow-none transition-shadow hover:shadow-md text-center md:text-left w-full md:w-auto">
              View previous proposals on Ethereum
            </p>
          </MiniAppLink>
        </div>
      </div>
    </div>
  );
};
