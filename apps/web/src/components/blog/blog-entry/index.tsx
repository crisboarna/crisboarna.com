import React, { VFC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export interface BlogEntryProps {
  readonly title: string;
  readonly description: string;
  readonly date: string;
  readonly image: string;
}

const BlogEntry: VFC<BlogEntryProps> = ({
  title,
  description,
  date,
  image,
}) => (
  <div className="col-lg-4 col-sm-6" key={title}>
    <div className="blog_post">
      <div className="blog_img">
        <LazyLoadImage className={'img-fluid'} src={image} effect={'blur'} />
        <div className="post_date">{date}</div>
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
          <h2>{title}</h2>
        </a>
        <p>{description}</p>
        <a href="/#" className="read_btn">
          Read more
          <i className="arrow_right"></i>{' '}
        </a>
      </div>
    </div>
  </div>
);

export default BlogEntry;
