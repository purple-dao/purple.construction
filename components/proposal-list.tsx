'use client';

import React, { useMemo } from 'react';

import type { ComponentConfig } from '@/lib/builder';
import { useDao, useProposals } from '@/lib/builder';
import { DAO_CONFIG } from '@/lib/config';

import { ProposalListItem } from './proposal-list-item';

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
    <div className="flex flex-col gap-6">
      <div id="proposal-list" className="flex flex-col gap-6 pt-10">
        {sortedProposals.map((proposal: any, i: number) => {
          if (maxProposals && i >= maxProposals) return null;
          return <ProposalListItem key={proposal.id} dao={dao} proposal={proposal} />;
        })}
      </div>

      <div className="flex justify-center pt-10">
        {/* this token ID was the last one issued on mainnet */}
        <a
          href={`https://nouns.build/dao/ethereum/${DAO_CONFIG.v1Token}/478?tab=activity`}
          target="_blank"
        >
          <p className="rounded-md border border-theme-border p-3 shadow-none transition-shadow hover:shadow-md md:flex-row md:p-4">
            View 61 proposals from Ethereum
          </p>
        </a>
      </div>
    </div>
  );
};
