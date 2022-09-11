import React, { ReactElement } from 'react';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AWS from './assets/images/awards/aws.png';
import K8 from './assets/images/awards/k8.png';
import R3 from './assets/images/awards/r3.png';
import Post from './assets/images/blog/post.jpg';
import Img1 from './assets/images/portofolio/1.jpg';
import Img2 from './assets/images/portofolio/2.jpg';
import Img3 from './assets/images/portofolio/3.jpg';
import Img4 from './assets/images/portofolio/4.jpg';
import Img9 from './assets/images/portofolio/9.jpg';
import Img10 from './assets/images/portofolio/10.jpg';

export interface ConstContactProps {
  readonly id: number;
  readonly text: string;
  readonly target: string;
  readonly icon: string;
}

export const API_URL = process.env.NX_WEB_API_URL;

export const ICONS: { [key: string]: ReactElement } = {
  github: (
    <FontAwesomeIcon
      icon={icon({
        style: 'brands',
        name: 'github',
      })}
      className={'icon'}
    />
  ),
  linkedin: (
    <FontAwesomeIcon
      icon={icon({
        style: 'brands',
        name: 'linkedin',
      })}
      className={'icon'}
    />
  ),
  twitter: (
    <FontAwesomeIcon
      icon={icon({
        style: 'brands',
        name: 'twitter',
      })}
      className={'icon'}
    />
  ),
  envelope: (
    <FontAwesomeIcon
      icon={icon({
        style: 'regular',
        name: 'envelope',
      })}
      className={'icon'}
    />
  ),
};

export const counters = [
  { id: 1, value: 183, description: 'Total Projects', icon: 'briefcase' },
  { id: 2, value: 114, description: 'Happy Clients', icon: 'happy' },
  { id: 3, value: 10, description: 'Years of Experience', icon: 'calendar' },
  { id: 4, value: 5, description: 'Certifications', icon: 'trophy' },
];

export const portfolio = [
  { title: 'WEB DESIGN', categories: ['tech', 'develop'], image: Img1 },
  { title: 'WEB DESIGN', categories: ['web', 'develop'], image: Img2 },
  { title: 'WEB DESIGN', categories: ['market', 'develop'], image: Img9 },
  { title: 'WEB DESIGN', categories: ['web'], image: Img10 },
  { title: 'WEB DESIGN', categories: ['web', 'market'], image: Img3 },
  { title: 'WEB DESIGN', categories: ['develop'], image: Img4 },
  { title: 'WEB DESIGN', categories: ['develop'], image: Img4 },
];

export const services = [
  {
    id: 1,
    iconName: 'icon-cloud',
    serviceTitle: 'Cloud',
    sDetails:
      'I architect, develop & deploy apps that are scalable & resilient for global audiences on AWS, Azure & Firebase',
  },
  {
    id: 2,
    iconName: 'icon-browser',
    serviceTitle: 'Web',
    sDetails:
      'Design & development of beautiful & rich web applications for all screen sizes that are modular, light & accessible.',
  },
  {
    id: 3,
    iconName: 'icon-mobile',
    serviceTitle: 'Mobile',
    sDetails:
      'I create beautiful cross-platform native mobile apps enriching your users experience with your products.',
  },
  {
    id: 4,
    iconName: 'icon-desktop',
    serviceTitle: 'Native',
    sDetails:
      'Experience delivering Windows, Linux & macOS native apps via Electron, Flutter or C++.',
  },
  {
    id: 5,
    iconName: 'icon-streetsign',
    serviceTitle: 'Self-starter',
    sDetails:
      'I am a quick learner and can take a project from A to Z while keeping stakeholders informed.',
  },
  {
    id: 6,
    iconName: 'icon-lightbulb',
    serviceTitle: 'Innovative',
    sDetails:
      'Given wide breadth of experience and skill I can provide original solutions and ideas to a problem.',
  },
];

export const certifications = [
  {
    title: 'AWS Certified Solutions Architect - Professional',
    description:
      'Most breadth & depth encompassing AWS certification for architecting & building',
    url: 'https://aws.amazon.com/certification/certified-solutions-architect-professional/',
    urlText: 'View more',
    image: AWS,
  },
  {
    title: 'AWS Certified DevOps Engineer - Professional',
    description:
      'Covers detailed implementation and deployment techniques across the platform',
    url: 'https://aws.amazon.com/certification/certified-devops-engineer-professional/',
    urlText: 'View more',
    image: AWS,
  },
  {
    title: 'AWS Certified Data Analytics – Specialty',
    description:
      'Ability to create complex & resilient big data ETL pipelines as part of a bigger system',
    url: 'https://aws.amazon.com/certification/certified-big-data-specialty/',
    urlText: 'View more',
    image: AWS,
  },
  {
    title: 'Kubernetes Certified Application Developer',
    description:
      'Skilled in developing for & on the Kubernetes platform on data and control plane',
    url: 'https://www.cncf.io/certification/ckad/',
    urlText: 'View more',
    image: K8,
  },
  {
    title: 'Corda Certified Blockchain Developer',
    description:
      'Certifies skillset in architecting & developing dApps on the Corda distributed ledger',
    url: 'https://r3certification.com/',
    urlText: 'View more',
    image: R3,
  },
];

export const blogEntries = [
  {
    title: 'Contrary to popular belief',
    description:
      'Suspendisse in mattis neque, sed accu- msan erat. Maecenas eget metus dui. Vestibulum accumsan massa quam..',
    date: 'Feb 14',
    image: Post,
  },
  {
    title: 'Behind the color',
    description:
      'Suspendisse in mattis neque, sed accu- msan erat. Maecenas eget metus dui. Vestibulum accumsan massa quam..',
    date: 'Mar 14',
    image: Post,
  },
  {
    title: 'Post with sidebar',
    description:
      'Suspendisse in mattis neque, sed accu- msan erat. Maecenas eget metus dui. Vestibulum accumsan massa quam..',
    date: 'May 14',
    image: Post,
  },
];

export const contact: ConstContactProps[] = [
  {
    id: 1,
    icon: 'envelope',
    text: 'Email: contact@crisboarna.com',
    target: 'mailto:contact@crisboarna.com',
  },
  {
    id: 2,
    icon: 'github',
    text: 'Github: @crisboarna',
    target: 'https://github.com/crisboarna',
  },
  {
    id: 3,
    icon: 'linkedin',
    text: 'LinkedIn: @crisboarna',
    target: 'https://www.linkedin.com/in/crisboarna',
  },
  {
    id: 4,
    icon: 'twitter',
    text: 'Twitter: @crisboarna',
    target: 'https://twitter.com/crisboarna',
  },
];

export const socials = [
  {
    name: 'Github',
    url: 'https://github.com/crisboarna',
    icon: 'github',
  },
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/in/crisboarna',
    icon: 'linkedin',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/crisboarna',
    icon: 'twitter',
  },
];
