import React, { ReactElement } from 'react';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AWS from './assets/images/awards/aws.png';
import K8 from './assets/images/awards/k8.png';
import R3 from './assets/images/awards/r3.png';
import Post from './assets/images/blog/post.jpg';
import AWSLogo from './assets/images/portofolio/aws-logo.png';
import KubernetesLogo from './assets/images/portofolio/kubernetes-logo.png';
import InnerILogo from './assets/images/portofolio/inneri-logo.png';
import CoachCoreLogo from './assets/images/portofolio/coachcore-logo.png';
import CollinsonLogo from './assets/images/portofolio/collinson-logo.png';
import KortexoLogo from './assets/images/portofolio/kortexo-logo.png';
import FlutterLogo from './assets/images/portofolio/flutter-logo.png';
import LGLogo from './assets/images/portofolio/lg-logo.png';
import VcpkgLogo from './assets/images/portofolio/vcpkg-logo.svg';
import VdLogo from './assets/images/portofolio/vd-logo.svg';
import WellLogo from './assets/images/portofolio/well-logo.png';

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
  { id: 1, value: 54, description: 'Total Projects', icon: 'briefcase' },
  { id: 2, value: 22, description: 'Happy Clients', icon: 'happy' },
  { id: 3, value: 10, description: 'Years of Experience', icon: 'calendar' },
  { id: 4, value: 5, description: 'Certifications', icon: 'trophy' },
];

export const portfolio = [
  {
    title: 'Kubernetes',
    subtitle: 'Contributor',
    categories: ['oss', 'go'],
    tech: ['Golang', 'Prometheus', 'IP Protocol', 'make'],
    image: KubernetesLogo,
    imageAlt: 'CNCF Kubernetes Open Source',
    body: 'Participated in the development of the Networking SIG TCP IPv4/v6 network stack and net probe testing by providing fixes that helped clean up the IPv4/IPv6 network stack used in the agent communication with the pods and provided stability fixes for Windows test suite.',
  },
  {
    title: 'Flutter',
    subtitle: 'Contributor',
    categories: ['oss', 'mobile'],
    tech: ['Dart', 'IP Networking', 'LUCI'],
    image: FlutterLogo,
    imageAlt: 'Google Flutter Open Source',
    body: "Helped in further expanding Google's Flutter framework by developing a network uptime checker in Flutter doctor utility.",
  },
  {
    title: 'AWS CDK',
    subtitle: 'Contributor',
    categories: ['oss', 'typescript'],
    tech: ['Typescript', 'AWS Cloudformation'],
    image: AWSLogo,
    imageAlt: 'AWS CDK Open Source',
    body: 'Expanded the managed Kafka service module by exposing the SAML-SCRAM authorisation endpoint in user realm. Created utility library that enforces best practices and shortens the development cycle while using AWS CDK.',
  },
  {
    title: 'vcpkg',
    subtitle: 'Contributor',
    categories: ['oss', 'cpp'],
    tech: ['C++', 'cmake', 'make'],
    image: VcpkgLogo,
    imageAlt: 'Microsoft VCPKG Open Source',
    body: 'Expanded the WebRTC related ports with updates and fixes keeping them up to date with upstream.',
  },
  {
    title: 'Well Portal',
    subtitle: 'FullStack Developer',
    categories: ['web', 'go'],
    tech: [
      'ReactJS',
      'Golang',
      'AWS Cognito',
      'AWS Lambda',
      'MySQL',
      'GatsbyJS',
    ],
    image: WellLogo,
    imageAlt: 'Well Logo',
    body: 'Developed new customer facing ReactJS application for digital and OTC customers.',
  },
  {
    title: 'Well ETL BI',
    subtitle: 'FullStack Developer',
    categories: ['go'],
    tech: [
      'Golang',
      'Python',
      'Spark',
      'AWS Kinesis',
      'AWS Glue',
      'PostgreSQL',
    ],
    image: WellLogo,
    imageAlt: 'Well Logo',
    body: 'Created an ETL pipeline leveraging AWS glue (Apache Spark), AWS Kinesis, Athena and Quicksight to provide realtime business information on customer activity for stock management and further downstream features.',
  },
  {
    title: 'CoachCore Admin Portal',
    subtitle: 'Lead Developer',
    categories: ['web', 'typescript'],
    tech: ['ReactJS', 'Typescript', 'AWS Lambda', 'AWS DynamoDB', 'AWS SNS'],
    image: CoachCoreLogo,
    imageAlt: 'CoachCore Logo',
    body: "Created full-stack application for the digitalisation of the foundation's partner administrative process through serverless ReactJS and Lambda.",
  },
  {
    title: 'LG NextTV PoC',
    subtitle: 'FullStack Developer',
    categories: ['cpp'],
    tech: ['C++', 'WebRTC', 'Electron', 'cmake', 'Docker', 'AWS CDK'],
    image: LGLogo,
    imageAlt: 'LG Logo',
    body: 'Created a WebRTC communication layer for an internal conferencing product. Built a viewer application using Electron.',
  },
  {
    title: 'Collinson SmartPay',
    subtitle: 'Lead Developer',
    categories: ['web', 'typescript'],
    tech: [
      'ReactJS',
      'Typescript',
      'PHP',
      'Drupal',
      'Redis',
      'MySQL',
      'AWS Lambda',
      'Docker',
    ],
    image: CollinsonLogo,
    imageAlt: 'Collinson Logo',
    body: 'Led team developing new smart offering system for marketplace products interfacing with multiple brand point banks in carrying their total asset worth.',
  },
  {
    title: 'VDX Direct Offers Marketplace',
    subtitle: 'FullStack Developer',
    categories: ['typescript'],
    tech: ['Typescript', 'Kafka', 'MySQL', 'Redis', 'Cloudfront', 'AWS Lambda'],
    image: VdLogo,
    imageAlt: 'Collinson Logo',
    body: 'Developed middleware that cashed product offers from multiple aggregators and presented them via an uniform API layer to subscribing customers that resulted in higher ROI for each individual partner.',
  },
  {
    title: 'Kortexo',
    subtitle: 'Personal Project',
    categories: ['mobile'],
    tech: ['Flutter', 'Dart', 'ReactJS', 'Typescript', 'Firebase', 'Lambda'],
    image: KortexoLogo,
    imageAlt: 'Kortexo Logo',
    body: 'Built a full-stack educational platform with a mobile app for users to subscribe and train on courses provided by partnering publishers.',
  },
  {
    title: 'InnerI',
    subtitle: 'Personal Project',
    categories: ['mobile'],
    tech: [
      'Flutter',
      'Dart',
      'Typescript',
      'Firebase',
      'Cloud Functions',
      'Fastlane',
    ],
    image: InnerILogo,
    imageAlt: 'Flutter Logo',
    body: "Built a full-stack serverless mobile app leveraging Google's Flutter framework for users to help track their feelings and improve their mental health.",
  },
];

export const services = [
  {
    id: 1,
    iconName: 'icon-cloud',
    serviceTitle: 'Cloud',
    sDetails:
      'I architect, develop & deploy apps that are scalable & resilient for global audiences on AWS, Azure & Firebase.',
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
      "I create beautiful cross-platform native mobile apps enriching the user's experience with your products.",
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
    imageAlt: 'AWS Logo',
  },
  {
    title: 'AWS Certified DevOps Engineer - Professional',
    description:
      'Covers detailed implementation and deployment techniques across the platform',
    url: 'https://aws.amazon.com/certification/certified-devops-engineer-professional/',
    urlText: 'View more',
    image: AWS,
    imageAlt: 'AWS Logo',
  },
  {
    title: 'AWS Certified Data Analytics – Specialty',
    description:
      'Ability to create complex & resilient big data ETL pipelines as part of a bigger system',
    url: 'https://aws.amazon.com/certification/certified-big-data-specialty/',
    urlText: 'View more',
    image: AWS,
    imageAlt: 'AWS Logo',
  },
  {
    title: 'Kubernetes Certified Application Developer',
    description:
      'Skilled in developing for & on the Kubernetes platform on data and control plane',
    url: 'https://www.cncf.io/certification/ckad/',
    urlText: 'View more',
    image: K8,
    imageAlt: 'Kubernetes Logo',
  },
  {
    title: 'Corda Certified Blockchain Developer',
    description:
      'Certifies skillset in architecting & developing dApps on the Corda distributed ledger',
    url: 'https://r3certification.com/',
    urlText: 'View more',
    image: R3,
    imageAlt: 'R3 Logo',
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
