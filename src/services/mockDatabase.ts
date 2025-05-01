
// This is a mock database service for demonstration purposes
// In a real implementation, this would be replaced with Supabase or another backend service

// Mock database structure
interface TeamMember {
  name: string;
  email: string;
  phone: string;
  college: string;
}

export interface Team {
  id: string;
  teamName: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  college: string;
  teamCode: string;
  members: TeamMember[];
  paymentProof?: string;
  createdAt: Date;
}

// In-memory storage
let teams: Team[] = [
  {
    id: '1',
    teamName: 'Byte Busters',
    leaderName: 'John Doe',
    leaderEmail: 'john@example.com',
    leaderPhone: '1234567890',
    college: 'MIT',
    teamCode: 'TM12A4B5',
    members: [
      { name: 'John Doe', email: 'john@example.com', phone: '1234567890', college: 'MIT' }
    ],
    createdAt: new Date(2025, 0, 15)
  },
  {
    id: '2',
    teamName: 'Code Wizards',
    leaderName: 'Jane Smith',
    leaderEmail: 'jane@example.com',
    leaderPhone: '2345678901',
    college: 'Stanford',
    teamCode: 'TM78X9Z0',
    members: [
      { name: 'Jane Smith', email: 'jane@example.com', phone: '2345678901', college: 'Stanford' },
      { name: 'Alex Chen', email: 'alex@example.com', phone: '3456789012', college: 'Stanford' }
    ],
    createdAt: new Date(2025, 0, 18)
  },
  {
    id: '3',
    teamName: 'Logic Lords',
    leaderName: 'Sam Wilson',
    leaderEmail: 'sam@example.com',
    leaderPhone: '3456789012',
    college: 'Caltech',
    teamCode: 'TM45P6Q7',
    members: [
      { name: 'Sam Wilson', email: 'sam@example.com', phone: '3456789012', college: 'Caltech' },
      { name: 'Amy Lee', email: 'amy@example.com', phone: '4567890123', college: 'Caltech' },
      { name: 'Tom Grant', email: 'tom@example.com', phone: '5678901234', college: 'Caltech' }
    ],
    createdAt: new Date(2025, 0, 20)
  }
];

// Generate a random team code
export const generateTeamCode = (): string => {
  const prefix = 'SF25-';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = prefix;
  
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  // Ensure code is unique
  if (teams.some(team => team.teamCode === result)) {
    return generateTeamCode(); // Recursively generate a new code
  }
  
  return result;
};

// Get team statistics
export const getTeamStats = () => {
  const totalTeams = teams.length;
  const totalParticipants = teams.reduce((sum, team) => sum + team.members.length, 0);
  
  return { totalTeams, totalParticipants };
};

// Check if team code exists
export const checkTeamCode = (code: string): { isValid: boolean; team?: Team; message?: string } => {
  const team = teams.find(t => t.teamCode === code);
  
  if (!team) {
    return { isValid: false, message: 'Invalid team code. Please check and try again.' };
  }
  
  if (team.members.length >= 3) {
    return { 
      isValid: false, 
      team, 
      message: 'This team is full (maximum 3 members).' 
    };
  }
  
  return { 
    isValid: true, 
    team,
    message: `Team found: ${team.teamName} (${team.members.length}/3 members)` 
  };
};

// Create a new team
export const createTeam = (teamData: Omit<Team, 'id' | 'teamCode' | 'members' | 'createdAt'>): Team => {
  const teamCode = generateTeamCode();
  const newTeam: Team = {
    id: Date.now().toString(),
    ...teamData,
    teamCode,
    members: [{
      name: teamData.leaderName,
      email: teamData.leaderEmail,
      phone: teamData.leaderPhone,
      college: teamData.college
    }],
    createdAt: new Date()
  };
  
  teams.push(newTeam);
  return newTeam;
};

// Join existing team
export const joinTeam = (
  teamCode: string, 
  memberData: { name: string; email: string; phone: string; college: string }
): { success: boolean; message: string; team?: Team } => {
  const result = checkTeamCode(teamCode);
  
  if (!result.isValid || !result.team) {
    return { 
      success: false, 
      message: result.message || 'Invalid team code' 
    };
  }
  
  const team = result.team;
  
  // Check if email already exists in team
  if (team.members.some(member => member.email === memberData.email)) {
    return { 
      success: false, 
      message: 'You are already registered with this team' 
    };
  }
  
  // Add member to team
  team.members.push(memberData);
  
  return { 
    success: true, 
    message: `Successfully joined team ${team.teamName}`,
    team 
  };
};

// Simulate sending an email
export const sendEmail = (to: string, subject: string, body: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      console.log(`Email sent to ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Body: ${body}`);
      resolve(true);
    }, 1000);
  });
};

// For testing/demo purposes
export const getAllTeams = (): Team[] => {
  return teams;
};
