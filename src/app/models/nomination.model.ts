export interface Nomination {
    _id?: string;
    status?: string;
    name: string;
    emailId: string;
    supervisorName: string;
    supervisorEmailId: string;
    homeLocation: string;
    currentTitle: string;
    nextTitle: string;
    coreCapabilities: string;
    projectName: string;
    businessImpact: string;
    projectFeedback: string;
    performanceSummary: string;
    developmentAreas: string;
    communityContributions: string;
    flightRisk: string;
    anyOtherHistory: string;
    timeInTitle: string;
    isDifferentiatorComment: string;
    whatWillChange: string;
    discussionPoints: string;
    priority: string;
    meetsTimeInTitle: boolean;
    reason?: string;
}