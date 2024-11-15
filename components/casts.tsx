"use client"

import { NeynarFeedList } from "@neynar/react"

export default function Casts(){
    return (
        <div className="mt-6 mb-3 overflow-x-hidden">
            <NeynarFeedList 
                feedType="filter"
                filterType="parent_url"
                parentUrl="chain://eip155:1/erc721:0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60"
                withRecasts={true}
                limit={25}
            />
        </div>
    )
}