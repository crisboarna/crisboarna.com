import React from 'react';
import { Reveal } from 'react-awesome-reveal';
import { fadeInUp } from '../../utils/animations';
import SectionTitle from '../section-title';
import BlogEntry from './blog-entry';
import { blogEntries } from '../../constants';

const Blog = () => (
  <section className="blog_area" id="blog">
    <div className="container">
      <SectionTitle
        title="Blog"
        description="Some of the latest thoughts and findings I shared on my blog."
        url={'http://blog.crisboarna.com'}
        urlTitle={'View blog'}
      />
      <Reveal keyframes={fadeInUp} duration={1000} triggerOnce={true}>
        <div className="row">
          {blogEntries.map((entry) => (
            <BlogEntry key={entry.title} {...entry} />
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

export default Blog;
