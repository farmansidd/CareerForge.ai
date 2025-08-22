// Type declarations for react-icons to resolve TS2786 errors
declare module 'react-icons/fa' {
  import * as React from 'react';
  
  interface IconProps extends React.SVGProps<SVGSVGElement> {
    color?: string;
    size?: string | number;
  }
  
  export const FaStar: React.FC<IconProps>;
  export const FaLightbulb: React.FC<IconProps>;
  export const FaChartLine: React.FC<IconProps>;
  export const FaBook: React.FC<IconProps>;
  export const FaBullseye: React.FC<IconProps>;
  export const FaCheck: React.FC<IconProps>;
  export const FaTimes: React.FC<IconProps>;
  export const FaPlus: React.FC<IconProps>;
  export const FaExternalLinkAlt: React.FC<IconProps>;
  export const FaLaptopCode: React.FC<IconProps>;
  export const FaBrain: React.FC<IconProps>;
  export const FaTrophy: React.FC<IconProps>;
  export const FaArrowRight: React.FC<IconProps>;
  export const FaPlay: React.FC<IconProps>;
  export const FaGithub: React.FC<IconProps>;
  export const FaLinkedin: React.FC<IconProps>;
  export const FaTwitter: React.FC<IconProps>;
  export const FaUserCircle: React.FC<IconProps>;
  export const FaRobot: React.FC<IconProps>;
  export const FaTools: React.FC<IconProps>;
  export const FaCogs: React.FC<IconProps>;
  export const FaBars: React.FC<IconProps>;
  export const FaChevronDown: React.FC<IconProps>;
  export const FaGraduationCap: React.FC<IconProps>;
  export const FaHandsHelping: React.FC<IconProps>;
  export const FaQuestionCircle: React.FC<IconProps>;
  export const FaRoute: React.FC<IconProps>;
  export const FaFileAlt: React.FC<IconProps>;
  export const FaSync: React.FC<IconProps>;
  export const FaTasks: React.FC<IconProps>;
  export const FaUserGraduate: React.FC<IconProps>;
  export const FaCalendarCheck: React.FC<IconProps>;
  export const FaRoad: React.FC<IconProps>;
  export const FaCheckCircle: React.FC<IconProps>;
  export const FaRegCircle: React.FC<IconProps>;
  export const FaSpinner: React.FC<IconProps>;
  export const FaCalendarAlt: React.FC<IconProps>;
  export const FaCertificate: React.FC<IconProps>;
  export const FaBriefcase: React.FC<IconProps>;
  export const FaCodeBranch: React.FC<IconProps>;
  export const FaRegStar: React.FC<IconProps>;
}
