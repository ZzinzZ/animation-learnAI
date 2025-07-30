
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '../contexts/ThemeContext';
import { User, Bell, Shield, Palette, Camera, BookOpen } from 'lucide-react';

const Settings = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'default', name: 'Default', colors: 'bg-blue-500' },
    { id: 'dark', name: 'Dark', colors: 'bg-gray-800' },
    { id: 'ocean', name: 'Ocean', colors: 'bg-teal-500' },
    { id: 'sunset', name: 'Sunset', colors: 'bg-orange-500' },
    { id: 'forest', name: 'Forest', colors: 'bg-green-500' },
  ];

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-theme-text mb-2">Settings</h1>
          <p className="text-theme-muted">Customize your learning experience</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="learning" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Learning
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Alex" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Chen" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="alex.chen@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Tell us about yourself..." />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize how LearnAI looks and feels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">Choose Theme</Label>
                  <div className="grid grid-cols-5 gap-3">
                    {themes.map((themeOption) => (
                      <button
                        key={themeOption.id}
                        onClick={() => setTheme(themeOption.id as any)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          theme === themeOption.id 
                            ? 'border-theme-primary ring-2 ring-theme-primary ring-opacity-20' 
                            : 'border-theme-border hover:border-theme-primary/50'
                        }`}
                      >
                        <div className={`w-8 h-8 ${themeOption.colors} rounded-full mx-auto mb-2`} />
                        <p className="text-sm font-medium text-theme-text">{themeOption.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Reduced Motion</Label>
                    <p className="text-sm text-theme-muted">Minimize animations and transitions</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Control when and how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Assignment Reminders</Label>
                    <p className="text-sm text-theme-muted">Get notified about upcoming assignments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Course Updates</Label>
                    <p className="text-sm text-theme-muted">New content and announcements</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Study Reminders</Label>
                    <p className="text-sm text-theme-muted">Gentle nudges to keep you on track</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>Manage your privacy settings and data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 flex items-center gap-3">
                    <Camera className="w-5 h-5 text-theme-primary" />
                    <div>
                      <Label className="text-base font-medium">Webcam Personalization</Label>
                      <p className="text-sm text-theme-muted">Enable enhanced learning personalization</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Data Analytics</Label>
                    <p className="text-sm text-theme-muted">Help improve the platform with usage data</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Profile Visibility</Label>
                    <p className="text-sm text-theme-muted">Make your profile visible to other students</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="learning">
            <Card>
              <CardHeader>
                <CardTitle>Learning Preferences</CardTitle>
                <CardDescription>Customize your learning experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="studyTime">Preferred Study Time</Label>
                  <Input id="studyTime" type="time" defaultValue="09:00" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Auto-play Videos</Label>
                    <p className="text-sm text-theme-muted">Automatically play next video in sequence</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Adaptive Difficulty</Label>
                    <p className="text-sm text-theme-muted">Adjust content difficulty based on performance</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
