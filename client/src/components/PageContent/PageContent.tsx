import React from 'react';
import Leaderboard from '../Leaderboard/Leaderboard';

interface PageContentProps {
    children?: React.ReactNode,
}

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <div className='page-content'>
        <div className="page-content-children">
          { children }
        </div>
        <Leaderboard />
    </div>
  )
}

export default PageContent;
