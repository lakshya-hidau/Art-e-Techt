import api from './api';

export const getProducerProjects = async () => {
    const response = await api.get('/projects/my-projects');
    return response.data;
};

export const getProducerApplications = async (status = '') => {
    const response = await api.get('/projects/my-applications/director', { params: { status } });
    return response.data;
};

export const createProducerProject = async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data;
};

export const updateProducerProject = async (projectId, projectData) => {
    const response = await api.put(`/projects/${projectId}`, projectData);
    return response.data;
};

export const updateProducerApplicationStatus = async (appId, status) => {
    const response = await api.put(`/projects/applications/${appId}/status`, { status });
    return response.data;
};

export const scheduleProducerAudition = async (appId, auditionData) => {
    const response = await api.put(`/projects/applications/${appId}/schedule-audition`, auditionData);
    return response.data;
};

