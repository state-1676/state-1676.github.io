// TypeScript interfaces for alliance and event data structures

export interface Alliance {
  id: string;
  name: string;
  fullName: string;
  rank: number;
  members: number;
  svsScore: string;
  description: string;
  achievements: string[];
  leader: string;
  color: string;
  bgGradient: string;
  tagline: string;
}

export interface AllianceEvent {
  name: string;
  emoji: string;
  times: string[];
  color: string;
  isVoteDependent?: boolean;
}

export interface AllianceEventData {
  name: string;
  color: string;
  events: AllianceEvent[];
}

export interface ServerConfig {
  serverName: string;
  serverNumber: string;
  napSystem: string;
  totalMembers: number;
  recruitmentDiscordLink: string;
}