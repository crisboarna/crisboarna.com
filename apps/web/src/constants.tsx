import AWS from './assets/images/awards/aws.png';
import K8 from './assets/images/awards/k8.png';
import R3 from './assets/images/awards/r3.png';
import Post from './assets/images/blog/post.jpg';
import React, { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

export interface ConstContactProps {
  readonly id: number;
  readonly text: string;
  readonly target: string;
  readonly icon: string;
}

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
};

export const services = [
  {
    id: 1,
    iconName: 'icon-desktop',
    serviceTitle: 'Web Design',
    sDetails:
      'There are many variations of pssages of Lorm available, bu in some form, Lorem Ipsum is simply dummy text.',
  },
  {
    id: 2,
    iconName: 'icon-pencil',
    serviceTitle: 'Development',
    sDetails:
      'There are many variations of pssages of Lorm available, bu in some form, Lorem Ipsum is simply dummy text.',
  },
  {
    id: 3,
    iconName: 'icon-presentation',
    serviceTitle: 'Marketing',
    sDetails:
      'There are many variations of pssages of Lorm available, bu in some form, Lorem Ipsum is simply dummy text.',
  },
  {
    id: 4,
    iconName: 'icon-linegraph',
    serviceTitle: 'Strategy',
    sDetails:
      'There are many variations of pssages of Lorm available, bu in some form, Lorem Ipsum is simply dummy text.',
  },
  {
    id: 5,
    iconName: 'icon-gears',
    serviceTitle: 'Support',
    sDetails:
      'There are many variations of pssages of Lorm available, bu in some form, Lorem Ipsum is simply dummy text.',
  },
  {
    id: 6,
    iconName: 'icon-tools',
    serviceTitle: 'We’re experienced',
    sDetails:
      'There are many variations of pssages of Lorm available, bu in some form, Lorem Ipsum is simply dummy text.',
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
