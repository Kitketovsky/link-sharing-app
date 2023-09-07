import TwitterIcon from "../assets/images/icon-twitter.svelte";
import GitHubIcon from "../assets/images/icon-github.svelte";
import FrontendMentorIcon from "../assets/images/icon-frontend-mentor.svelte";
import LinkedInIcon from "../assets/images/icon-linkedin.svelte";
import YouTubeIcon from "../assets/images/icon-youtube.svelte";
import FacebookIcon from "../assets/images/icon-facebook.svelte";
import TwitchIcon from "../assets/images/icon-twitch.svelte";
import DevToIcon from "../assets/images/icon-devto.svelte";
import CodewarsIcon from "../assets/images/icon-codewars.svelte";
import FreeCodeCampIcon from "../assets/images/icon-freecodecamp.svelte";
import GitLabIcon from "../assets/images/icon-gitlab.svelte";
import HashnodeIcon from "../assets/images/icon-hashnode.svelte";
import StackOverflowIcon from "../assets/images/icon-stack-overflow.svelte";

const options = [
  {
    id: "github",
    name: "GitHub",
    icon: GitHubIcon,
    color: "#1a1a1a",
  },
  {
    id: "frontend-mentor",
    name: "Frontend Mentor",
    icon: FrontendMentorIcon,
    color: "#ffffff",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: TwitterIcon,
    color: "#43B7E9",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: LinkedInIcon,
    color: "#2D68FF",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: YouTubeIcon,
    color: "#EE3939",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: FacebookIcon,
    color: "#2442AC",
  },
  {
    id: "twitch",
    name: "Twitch",
    icon: TwitchIcon,
    color: "#EE3FC8",
  },
  {
    id: "dev-to",
    name: "dev.to",
    icon: DevToIcon,
    color: "#333333",
  },
  {
    id: "codewars",
    name: "Codewars",
    icon: CodewarsIcon,
    color: "#8A1A50",
  },
  {
    id: "free-code-camp",
    name: "freeCodeCamp",
    icon: FreeCodeCampIcon,
    color: "#302267",
  },
  {
    id: "gitlab",
    name: "GitLab",
    icon: GitLabIcon,
    color: "#EB4925",
  },
  {
    id: "hashnode",
    name: "Hashnode",
    icon: HashnodeIcon,
    color: "#0330D1",
  },
  {
    id: "stack-overflow",
    name: "Stack Overflow",
    icon: StackOverflowIcon,
    color: "#EC7100",
  },
];

export default options;

export type IOptions = typeof options;
