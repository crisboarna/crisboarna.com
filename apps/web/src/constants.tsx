import React, { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
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
import { ICertification } from './components/certifications';
import { ICounter } from './components/counters';
import { ISocial } from './components/footer';
import { IService } from './components/services';
import { ITool } from './components/tools';
import { IPortfolioEntry } from './components/portfolio';
import GolangLogo from './assets/images/tools/golang.png';
import ReactLogo from './assets/images/tools/react.png';
import DartLogo from './assets/images/tools/dart.png';
import PythonLogo from './assets/images/tools/python.png';
import KafkaLogo from './assets/images/tools/kafka.png';
import KotlinLogo from './assets/images/tools/kotlin.png';
import FlutterToolLogo from './assets/images/tools/flutter.png';

export interface ConstContactProps {
  readonly id: number;
  readonly text: string;
  readonly target: string;
  readonly icon: string;
}

export const API_URL =
  import.meta.env.VITE_API_URL|| 'https://api.crisboarna.com';
export const CV_URL = import.meta.env.VITE_CV_URL || 'https://cv.crisboarna.com';

export const ICONS: { [key: string]: ReactElement } = {
  github: (
    <FontAwesomeIcon
      icon={faGithub}
      className={'icon'}
    />
  ),
  linkedin: (
    <FontAwesomeIcon
      icon={faLinkedin}
      className={'icon'}
    />
  ),
  twitter: (
    <FontAwesomeIcon
      icon={faTwitter}
      className={'icon'}
    />
  ),
  envelope: (
    <FontAwesomeIcon
      icon={faEnvelope}
      className={'icon'}
    />
  ),
};

export const counters: ICounter[] = [
  { id: 1, value: 54, description: 'Total Projects', icon: 'briefcase' },
  { id: 2, value: 22, description: 'Happy Clients', icon: 'happy' },
  { id: 3, value: 10, description: 'Years of Experience', icon: 'calendar' },
  { id: 4, value: 5, description: 'Certifications', icon: 'trophy' },
];

export const portfolio: IPortfolioEntry[] = [
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
    body: "Expanded Google's Flutter framework by adding new features to the CLI such as a network uptime checker in the `flutter doctor` utility.",
  },
  {
    title: 'AWS CDK',
    subtitle: 'Contributor',
    categories: ['oss', 'typescript'],
    tech: ['Typescript', 'AWS Cloudformation', 'AWS Managed Kafka Service'],
    image: AWSLogo,
    imageAlt: 'AWS CDK Open Source',
    body: 'Expanded the managed Kafka service module by exposing the SAML-SCRAM authorisation endpoint in user realm. Furthermore, I created an utility library that enforces best practices and shortens the development cycle while using AWS CDK.',
  },
  {
    title: 'Microsoft vcpkg',
    subtitle: 'Contributor',
    categories: ['oss', 'cpp'],
    tech: ['C++', 'cmake', 'make', 'WebRTC'],
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
    body: 'Developed new customer facing ReactJS application for digital and OTC customers implementig both frontend and backend. The micro frontend is composed of multiple websites ranging from pure ReactJS to GatsbyJS and is hosted on AWS S3. The backend is written in Golang and is hosted on AWS Lambda.',
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
    body: 'Created an ETL pipeline leveraging AWS Glue (Apache Spark), AWS Kinesis, Athena and Quicksight to provide realtime business information on customer activity for stock management and further downstream features. This realtime tool enabled the creation of new revenue streams and improved customer experience.',
  },
  {
    title: 'CoachCore Admin Portal',
    subtitle: 'Lead Developer',
    categories: ['web', 'typescript'],
    tech: ['ReactJS', 'Typescript', 'AWS Lambda', 'AWS DynamoDB', 'AWS SNS'],
    image: CoachCoreLogo,
    imageAlt: 'CoachCore Logo',
    body: "Enabled the digitisation of the foundation's monthly and quarterly administrative process through a bespoke serverless ReactJS on S3 and Lambda backend with DynamoDB. Led the development of the frontend and backend, and provided technical guidance to the team as well as performing the requirements gathering and analysis.",
  },
  {
    title: 'LG NextTV PoC',
    subtitle: 'FullStack Developer',
    categories: ['cpp'],
    tech: ['C++', 'WebRTC', 'Electron', 'cmake', 'Docker', 'AWS CDK'],
    image: LGLogo,
    imageAlt: 'LG Logo',
    body: 'Created the WebRTC communication layer and the Unix socket local transfer between services modules for a realtime internal conferencing product. Optimized and setup the needed WebSocket signaling and SFU server side components for the WebRTC interaction to function. Also built the cross-platform WebRTC viewer application using Electron.',
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
    body: 'Led team developing new smart offering system for marketplace products aggregating, serving to users via whitelabel website or via a direct federated API integration as well as handling the entire lifecycle of a purchase. Mediated between multiple internal and external business stakeholders. System was built on top of Lambda, Redis, MySQL, S3 and ReactJS.',
  },
  {
    title: 'VDX Direct Offers Marketplace',
    subtitle: 'FullStack Developer',
    categories: ['typescript'],
    tech: ['Typescript', 'Kafka', 'MySQL', 'Redis', 'Cloudfront', 'AWS Lambda'],
    image: VdLogo,
    imageAlt: 'Collinson Logo',
    body: 'Developed middleware that cashed product offers from multiple aggregators and presented them via an uniform API layer to subscribing customers that resulted in higher ROI for each individual partner. The system was built leveraging Kafka, Redis, MySQL, AWS Lambda, AWS ECS, Docker and Typescript.',
  },
  {
    title: 'Kortexo',
    subtitle: 'Personal Project',
    categories: ['mobile'],
    tech: ['Flutter', 'Dart', 'ReactJS', 'Typescript', 'Firebase', 'Lambda'],
    image: KortexoLogo,
    imageAlt: 'Kortexo Logo',
    body: 'Built a full-stack educational platform with a mobile app for users to subscribe and train on courses provided by partnering publishers. The users could use either a native Android/iOS mobile app or website. Operational access was provided via a dedicated ReactJS admin portal. Fully leveraged Firebase for authentication, storage, hosting, dynamic links, analytics and metadata analysis.',
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
    body: "Building a full-stack serverless mobile app leveraging Google's Flutter framework for users to help track their feelings and improve their mental health. The app is built with a mobile first approach and is fully serverless leveraging Firebase for authentication, storage, hosting, dynamic links, and analytics.",
  },
];

export const services: IService[] = [
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

export const certifications: ICertification[] = [
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

export const contacts: ConstContactProps[] = [
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

export const socials: ISocial[] = [
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

export const tools: ITool[] = [
  {
    name: 'Golang',
    image: GolangLogo,
    url: 'https://golang.org/',
  },
  {
    name: 'ReactJS',
    image: ReactLogo,
    url: 'https://reactjs.org/',
  },
  {
    name: 'Dart',
    image: DartLogo,
    url: 'https://dart.dev/',
  },
  {
    name: 'Flutter',
    image: FlutterToolLogo,
    url: 'https://flutter.dev/',
  },
  {
    name: 'Python',
    image: PythonLogo,
    url: 'https://www.python.org/',
  },
  {
    name: 'Kafka',
    image: KafkaLogo,
    url: 'https://kafka.apache.org/',
  },
  {
    name: 'Kotlin',
    image: KotlinLogo,
    url: 'https://kotlinlang.org/',
  },
];
