import React from 'react';
import LinkList from '../../components/LinkList';
import { linkList } from '../../utils/constants';

export default function Home() {
  return (
    <div className="container">
      <h3 style={{ marginTop: '5rem' }}>React Testing Library Demos</h3>
      <div style={{ marginTop: '5rem' }} className="row">
        <div className="column">
          <LinkList links={linkList} />
        </div>
      </div>
    </div>
  );
}
