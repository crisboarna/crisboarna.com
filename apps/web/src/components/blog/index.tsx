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
        title="Our Blog"
        description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
      />
      <Reveal keyframes={fadeInUp} duration={1000} triggerOnce={true}>
        <div className="row">
          {blogEntries.map((entry) => (
            <BlogEntry entry={entry} key={entry.title} />
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

export default Blog;
