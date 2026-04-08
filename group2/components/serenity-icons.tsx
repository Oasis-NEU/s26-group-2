import React from 'react';
import Svg, {
  Path,
  Circle,
  Rect,
  Line,
  Polyline,
} from 'react-native-svg';

type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

// ── Brand / Navigation ──────────────────────────────────────────

export const LotusIcon = ({ size = 24, color = '#2E7D8C', strokeWidth = 1.5 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 22c0 0-8-4-8-11a8 8 0 0 1 16 0c0 7-8 11-8 11z" />
    <Path d="M12 22V10" />
    <Path d="M8 14c-2-2-4-5-2-8 2 1 3 3 4 5" />
    <Path d="M16 14c2-2 4-5 2-8-2 1-3 3-4 5" />
  </Svg>
);

export const LeafIcon = ({ size = 24, color = '#2E7D8C', strokeWidth = 1.5 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 2c-4 4-6 7-6 10a6 6 0 0 0 12 0c0-3-2-6-6-10z" />
    <Path d="M12 12v5" />
  </Svg>
);

export const HomeIcon = ({ size = 24, color = '#2E7D8C', strokeWidth = 1.5 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <Polyline points="9 22 9 12 15 12 15 22" />
  </Svg>
);

export const ChatIcon = ({ size = 24, color = '#2E7D8C', strokeWidth = 1.5 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </Svg>
);

export const ProfileIcon = ({ size = 24, color = '#2E7D8C', strokeWidth = 1.5 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <Circle cx="12" cy="7" r="4" />
  </Svg>
);

export const ExploreIcon = ({ size = 24, color = '#2E7D8C', strokeWidth = 1.5 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="11" cy="11" r="8" />
    <Line x1="21" y1="21" x2="16.65" y2="16.65" />
  </Svg>
);

// ── UI Actions ───────────────────────────────────────────────────

export const BellIcon = ({ size = 24, color = '#2E7D8C', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </Svg>
);

export const SettingsIcon = ({ size = 24, color = '#2E7D8C', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="3" />
    <Path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </Svg>
);

export const EditIcon = ({ size = 24, color = '#2E86C1', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </Svg>
);

export const SendIcon = ({ size = 20, color = '#ffffff', strokeWidth = 2 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Line x1="22" y1="2" x2="11" y2="13" />
    <Path d="M22 2L15 22l-4-9-9-4 20-7z" fill={color} />
  </Svg>
);

export const CloseIcon = ({ size = 20, color = '#A0B4C5', strokeWidth = 2 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
    <Line x1="18" y1="6" x2="6" y2="18" />
    <Line x1="6" y1="6" x2="18" y2="18" />
  </Svg>
);

// ── Contact / Info ───────────────────────────────────────────────

export const EmailIcon = ({ size = 16, color = '#7FB3D3', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <Polyline points="22,6 12,13 2,6" />
  </Svg>
);

export const UserIcon = ({ size = 16, color = '#7FB3D3', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <Circle cx="12" cy="7" r="4" />
  </Svg>
);

// ── Category / Explore ───────────────────────────────────────────

export const GamesIcon = ({ size = 28, color = '#2E7D8C', strokeWidth = 1.5 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Rect x="2" y="6" width="20" height="12" rx="3" />
    <Path d="M8 12h8" />
    <Path d="M12 8v8" />
    <Circle cx="17.5" cy="12" r="0.5" fill={color} />
    <Circle cx="15.5" cy="10" r="0.5" fill={color} />
  </Svg>
);

export const MeditateIcon = ({ size = 28, color = '#2E7D8C', strokeWidth = 1.5 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 2c-4 4-6 7-6 10a6 6 0 0 0 12 0c0-3-2-6-6-10z" />
    <Path d="M12 12v4" />
    <Path d="M9 16c1 1.5 5 1.5 6 0" />
  </Svg>
);

export const ResourcesIcon = ({ size = 28, color = '#2E7D8C', strokeWidth = 1.5 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <Path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <Line x1="9" y1="9" x2="15" y2="9" />
    <Line x1="9" y1="13" x2="13" y2="13" />
  </Svg>
);

export const HeartIcon = ({ size = 28, color = '#2E7D8C', strokeWidth = 1.5 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </Svg>
);

// ── Mood Faces ───────────────────────────────────────────────────

export const MoodGreatIcon = ({ size = 30, color = '#A0B4C5', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Path d="M8.5 9.5c0.5-1 1.5-1 2 0" />
    <Path d="M13.5 9.5c0.5-1 1.5-1 2 0" />
    <Path d="M7 13.5c1 3 9 3 10 0" />
  </Svg>
);

export const MoodGoodIcon = ({ size = 30, color = '#A0B4C5', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Circle cx="9" cy="10" r="1" fill={color} stroke="none" />
    <Circle cx="15" cy="10" r="1" fill={color} stroke="none" />
    <Path d="M8.5 15c1 1.5 6 1.5 7 0" />
  </Svg>
);

export const MoodOkayIcon = ({ size = 30, color = '#A0B4C5', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Circle cx="9" cy="10" r="1" fill={color} stroke="none" />
    <Circle cx="15" cy="10" r="1" fill={color} stroke="none" />
    <Line x1="8.5" y1="15" x2="15.5" y2="15" />
  </Svg>
);

export const MoodLowIcon = ({ size = 30, color = '#A0B4C5', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Circle cx="9" cy="10" r="1" fill={color} stroke="none" />
    <Circle cx="15" cy="10" r="1" fill={color} stroke="none" />
    <Path d="M8.5 16c1-1.5 6-1.5 7 0" />
  </Svg>
);

export const MoodAwfulIcon = ({ size = 30, color = '#A0B4C5', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Circle cx="9" cy="10" r="1" fill={color} stroke="none" />
    <Circle cx="15" cy="10" r="1" fill={color} stroke="none" />
    <Path d="M8.5 17c1-2.5 6-2.5 7 0" />
    <Path d="M15 13c0 0 1 1.5 0 2a1 1 0 0 1-1-1c0-0.5 1-1 1-1z" fill={color} stroke="none" />
  </Svg>
);

export const MOOD_ICONS = [
  MoodGreatIcon,
  MoodGoodIcon,
  MoodOkayIcon,
  MoodLowIcon,
  MoodAwfulIcon,
];

export const MoonIcon = ({ size = 24, color = '#2E7D8C', strokeWidth = 1.5 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </Svg>
);

// ── Tab Bar Icons ────────────────────────────────────────────────

export const HomeTabIcon = ({ size = 24, color = '#2E7D8C', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <Polyline points="9 22 9 12 15 12 15 22" />
  </Svg>
);

export const ExploreTabIcon = ({ size = 24, color = '#2E7D8C', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Polyline points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </Svg>
);

export const ChatTabIcon = ({ size = 24, color = '#2E7D8C', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </Svg>
);

export const ProfileTabIcon = ({ size = 24, color = '#2E7D8C', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <Circle cx="12" cy="7" r="4" />
  </Svg>
);

export const ResourcesTabIcon = ({ size = 24, color = '#2E7D8C', strokeWidth = 1.5 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <Path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <Line x1="9" y1="9" x2="15" y2="9" />
    <Line x1="9" y1="13" x2="13" y2="13" />
  </Svg>
);

export const MeditateTabIcon = ({ size = 24, color = '#2E7D8C', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="5" r="2" />
    <Path d="M12 8c-3 2-4 5-2 7" />
    <Path d="M12 8c3 2 4 5 2 7" />
    <Path d="M7 15c1.5 2 8.5 2 10 0" />
    <Path d="M5 17c2 1.5 12 1.5 14 0" />
  </Svg>
);