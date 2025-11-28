import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { ListItem } from './types';

//   const activityItems: ListItem[] = [
//     {
//       id: 'login',
//       title: 'Login Activity',
//       subtitle: 'Signed in from iPhone • 2 hours ago',
//       leadingIcon: (
//         <MaterialCommunityIcons name="login" size={20} color="#10B981" />
//       ),
//       type: 'success',
//       onPress: () => setActiveItem('login'),
//     },
//     {
//       id: 'backup',
//       title: 'Backup Completed',
//       subtitle: 'All data backed up successfully • 1 day ago',
//       leadingIcon: <MaterialIcons name="backup" size={20} color="#3B82F6" />,
//       onPress: () => setActiveItem('backup'),
//     },
//     {
//       id: 'warning',
//       title: 'Storage Almost Full',
//       subtitle: '91% of storage used • 3 days ago',
//       leadingIcon: <Feather name="alert-triangle" size={20} color="#F59E0B" />,
//       type: 'warning',
//       onPress: () => setActiveItem('warning'),
//     },
//     {
//       id: 'error',
//       title: 'Sync Failed',
//       subtitle: 'Unable to sync data • 5 days ago',
//       leadingIcon: (
//         <MaterialIcons name="sync-problem" size={20} color="#EF4444" />
//       ),
//       type: 'danger',
//       onPress: () => setActiveItem('error'),
//     },
//   ];

export const supportItems: ListItem[] = [
  {
    id: 'policy',
    title: 'Privacy Policy',
    subtitle: 'Read how we manage your data',
    leadingIcon: <Feather name="help-circle" size={20} color="#E5E7EB" />,
    trailingIcon: <Feather name="external-link" size={18} color="#6B7280" />,
  },
  {
    id: 'contact',
    title: 'Contact Support',
    subtitle: 'Get help from our support team',
    leadingIcon: <Feather name="message-circle" size={20} color="#E5E7EB" />,
    trailingIcon: <Feather name="chevron-right" size={20} color="#6B7280" />,
  },
  {
    id: 'feedback',
    title: 'Send Feedback',
    subtitle: 'Help us improve the app',
    leadingIcon: <MaterialIcons name="feedback" size={20} color="#E5E7EB" />,
    trailingIcon: <Feather name="chevron-right" size={20} color="#6B7280" />,
  },
];

export const dangerItems: ListItem[] = [
  {
    id: 'logout',
    title: 'Sign Out',
    subtitle: 'Sign out of your account',
    leadingIcon: (
      <MaterialCommunityIcons name="logout" size={20} color="#EF4444" />
    ),
    type: 'danger',
  },
  {
    id: 'delete',
    title: 'Delete Account',
    subtitle: 'Permanently delete your account',
    leadingIcon: <AntDesign name="delete" size={20} color="#EF4444" />,
    type: 'danger',
  },
];
