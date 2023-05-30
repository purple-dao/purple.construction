import { NotionAPI } from 'notion-client';
import { useEffect, useState } from 'react';

type NotionContentProps = {
    notionPageId: string;
};

const NotionContent = (props: NotionContentProps) => {
// const notion = new NotionAPI()


// const recordMap = notion.getPage(props.notionPageId)
// const recordMap = await notion.getPage(props.notionPageId)
// const [notionContent, setNotionContent] = useState();

const getNotionContent = async () => {
    // return await notion.getPage(props.notionPageId)
    // const api = new NotionAPI()
    // const page = await api.getPage('067dd719-a912-471e-a9a3-ac10710e7fdf')
    // console.log(page);
}
getNotionContent();
// useEffect(() => {
//     // setNotionContent(getNotionContent());
// }, [])

// console.log('notionContent', notionContent);
  
  return (
    <div className="">
      
    </div>
  );
};

export default NotionContent;
