"use client"

import { NeynarFeedList } from "@neynar/react"

export default function Casts(){
    return (
        <div className="overflow-x-hidden w-full">
            <style jsx global>{`
                .sfmkqcr {
                    width: 100% !important;
                    max-width: 100% !important;
                }
                .sxqvxvq {
                    width: 100% !important;
                    max-width: 100% !important;
                }
                @media (max-width: 600px) {
                    .sxqvxvq {
                        padding: 0 !important;
                        padding-top: 2% !important
                    }
                }
                @media (max-width: 768px) {
                    .sfmkqcr {
                        border-width: 0 !important;
                    }
                }
            `}</style>
            <div className="flex justify-center w-[100%]">
                <NeynarFeedList 
                    feedType="filter"
                    filterType="parent_url"
                    parentUrl="chain://eip155:1/erc721:0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60"
                    withRecasts={true}
                    limit={25}
                />
            </div>
        </div>
    )
}