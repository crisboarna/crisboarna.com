import AWS from './assets/images/awards/aws.png';
import K8 from './assets/images/awards/k8.png';
import R3 from './assets/images/awards/r3.png';
import Post from './assets/images/blog/post.jpg';

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

export const contact = [
  {
    id: '1',
    title: 'Contact Info',
    menuItems: [
      {
        id: 1,
        icon: 'icon_mail',
        text: 'Email: contact@crisboarna.com',
        target: 'mailto:contact@crisboarna.com',
      },
      {
        id: 2,
        icon: 'social_linkedin_circle',
        text: 'LinkedIn: crisboarna',
        target: 'https://www.linkedin.com/in/crisboarna',
      },
      {
        id: 2,
        icon: 'social_linkedin_circle',
        text: 'LinkedIn: crisboarna',
        target: 'https://www.linkedin.com/in/crisboarna',
      },
    ],
  },
];

export const socials = [
  {
    name: 'Facebook',
    url: 'http://www.linkedin.com/',
    className: 'social_facebook',
  },
  {
    name: 'twitter',
    url: 'http://www.twitter.com/',
    className: 'social_twitter',
  },
  {
    name: 'googleplus',
    url: 'http://www.googleplus.com',
    className: 'social_googleplus',
  },
  {
    name: 'pinterest',
    url: 'http://www.pinterest.com',
    className: 'social_pinterest',
  },
];
