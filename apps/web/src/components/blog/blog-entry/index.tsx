import React, { VFC } from 'react';

export interface BlogEntry {
  readonly title: string;
  readonly description: string;
  readonly date: string;
  readonly image: string;
}

export interface BlogEntryProps {
  readonly entry: BlogEntry;
}

const BlogEntry: VFC<BlogEntryProps> = ({ entry }) => (
  <div className="col-lg-4 col-sm-6">
    <div className="blog_post">
      <div className="blog_img">
        <img className="img-fluid" src={entry.image} alt="" />
        <div className="post_date">{entry.date}</div>
      </div>
      <div className="post_content">
        <div className="blog-meta">
          <span>
            <i className="icon_tags_alt"></i>
            By : Cris
          </span>
          <span>
            <i className="icon_chat_alt"></i>
            <a href="/#">0 comment</a>
          </span>
        </div>
        <a href="/#">
          <h2>{entry.title}</h2>
        </a>
        <p>{entry.description}</p>
        <a href="/#" className="read_btn">
          Read more
          <i className="arrow_right"></i>{' '}
        </a>
      </div>
    </div>
  </div>
);

export default BlogEntry;
