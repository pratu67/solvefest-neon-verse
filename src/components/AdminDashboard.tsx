
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllTeams, Team } from '@/services/mockDatabase';
import { Download, FileSpreadsheet, Search, RefreshCw, UserPlus, Users } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from backend
    const loadData = () => {
      setIsLoading(true);
      setTimeout(() => {
        const allTeams = getAllTeams();
        setTeams(allTeams);
        setIsLoading(false);
      }, 1000);
    };
    
    loadData();
  }, []);

  // Filter teams based on search query
  const filteredTeams = teams.filter(team => 
    team.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.teamCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.college.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stats calculation
  const totalTeams = teams.length;
  const totalParticipants = teams.reduce((sum, team) => sum + team.members.length, 0);
  const fullTeams = teams.filter(team => team.members.length === 3).length;
  
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      const refreshedTeams = getAllTeams();
      setTeams(refreshedTeams);
      setIsLoading(false);
    }, 1000);
  };

  const handleExport = () => {
    // In a real app, this would generate a CSV/Excel file
    alert('Exporting team data...');
  };

  return (
    <div className="p-6 bg-dark/50 rounded-lg">
      <h2 className="text-2xl font-orbitron mb-6 text-glow-blue">Admin Dashboard</h2>
      
      {/* Stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-dark/70 rounded-lg p-4 border border-neon-blue border-opacity-40">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-light/70 text-sm">Total Teams</p>
              <p className="text-2xl font-orbitron text-neon-blue">{totalTeams}</p>
            </div>
            <Users className="text-neon-blue h-6 w-6 opacity-70" />
          </div>
        </div>
        
        <div className="bg-dark/70 rounded-lg p-4 border border-neon-green border-opacity-40">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-light/70 text-sm">Total Participants</p>
              <p className="text-2xl font-orbitron text-neon-green">{totalParticipants}</p>
            </div>
            <UserPlus className="text-neon-green h-6 w-6 opacity-70" />
          </div>
        </div>
        
        <div className="bg-dark/70 rounded-lg p-4 border border-neon-purple border-opacity-40">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-light/70 text-sm">Full Teams (3 members)</p>
              <p className="text-2xl font-orbitron text-neon-purple">{fullTeams}</p>
            </div>
            <Users className="text-neon-purple h-6 w-6 opacity-70" />
          </div>
        </div>
      </div>
      
      {/* Search and actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light/50 h-4 w-4" />
          <Input
            placeholder="Search teams by name, code or college..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-dark/30 border-light/20 text-light"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-neon-blue text-neon-blue hover:bg-neon-blue/20"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          <Button
            variant="outline"
            className="border-neon-green text-neon-green hover:bg-neon-green/20"
            onClick={handleExport}
          >
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      {/* Teams table */}
      <div className="rounded-md border border-light/20 overflow-hidden">
        <Table>
          <TableHeader className="bg-dark/70">
            <TableRow>
              <TableHead className="w-[120px] text-light/80">Team Code</TableHead>
              <TableHead className="text-light/80">Team Name</TableHead>
              <TableHead className="text-light/80">Leader</TableHead>
              <TableHead className="text-light/80">College</TableHead>
              <TableHead className="text-light/80">Members</TableHead>
              <TableHead className="text-light/80">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-light/50">
                  Loading team data...
                </TableCell>
              </TableRow>
            ) : filteredTeams.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-light/50">
                  {searchQuery ? 'No teams match your search' : 'No teams registered yet'}
                </TableCell>
              </TableRow>
            ) : (
              filteredTeams.map(team => (
                <TableRow key={team.id} className="border-light/10 hover:bg-dark/60">
                  <TableCell className="font-orbitron text-neon-blue text-sm">{team.teamCode}</TableCell>
                  <TableCell className="font-medium text-light">{team.teamName}</TableCell>
                  <TableCell className="text-light/80">{team.leaderName}</TableCell>
                  <TableCell className="text-light/80">{team.college}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center text-light/80">
                      <Users className="h-3 w-3 mr-1 text-neon-green" /> 
                      {team.members.length}/3
                    </span>
                  </TableCell>
                  <TableCell className="text-light/60 text-sm">
                    {new Date(team.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4 text-xs text-light/40 italic">
        Note: This is a demo admin panel. In a real implementation, this would be protected by authentication.
      </div>
    </div>
  );
};

export default AdminDashboard;
