import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ITool } from './index';

export interface ToolsProps {
  readonly tools: ITool[];
}

const Tools = ({ tools }: ToolsProps) => (
  <div className="work_area dev_clients_logo_area">
    <div className="container">
      <div className="clients_intrigration">
        {tools.map((tool, idx) => (
          <a
            key={idx}
            href={tool.url}
            className={`c_items${idx === 3 ? ' middle' : ''}`}
          >
            <img src={tool.image} alt={tool.name} />
            {/*<LazyLoadImage*/}
            {/*  key={idx}*/}
            {/*  src={tool.image}*/}
            {/*  alt={tool.name}*/}
            {/*  effect={'blur'}*/}
            {/*/>*/}
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default Tools;
