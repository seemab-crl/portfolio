// filepath: assets/js/portfolio-data.js
const portfolioProjects = {
  'app1': {
    title: 'Travel History App',
    category: 'Mobile App',
    client: 'Personal Project',
    date: 'January 2024',
    url: '#',
    description: 'Track your travel history and memories with this intuitive Flutter application. Features include location mapping, photo galleries, and trip statistics. The app uses Firebase for real-time data synchronization and provides an elegant UI for managing travel memories.',
    images: ['assets/img/portfolio/appp1.png'],
    features: [
      'Location-based tracking',
      'Photo gallery integration',
      'Trip statistics and analytics',
      'Cloud synchronization',
      'Offline support'
    ],
    technologies: ['Flutter', 'Dart', 'Firebase', 'Google Maps API']
  },
  'app2': {
    title: 'Task Manager App',
    category: 'Mobile App',
    client: 'Business Solution',
    date: 'February 2024',
    url: '#',
    description: 'A comprehensive task management application built with Flutter. Organize tasks, set reminders, and collaborate with team members efficiently. This app includes priority management, deadline tracking, and team collaboration features.',
    images: ['assets/img/portfolio/appp-2.jpg'],
    features: [
      'Task creation and management',
      'Priority levels and categories',
      'Reminder notifications',
      'Team collaboration',
      'Progress tracking'
    ],
    technologies: ['Flutter', 'Dart', 'Firebase', 'SQLite']
  },
  'app3': {
    title: 'Habit Tracker',
    category: 'Mobile App',
    client: 'Health & Wellness',
    date: 'March 2024',
    url: '#',
    description: 'Build better habits with this tracking app. Monitor daily progress, set goals, and visualize your improvement over time. Includes motivational features, streak tracking, and detailed analytics.',
    images: ['assets/img/portfolio/appp-3.jpg'],
    features: [
      'Habit tracking',
      'Streak monitoring',
      'Goal setting',
      'Progress visualization',
      'Motivational reminders'
    ],
    technologies: ['Flutter', 'Dart', 'Provider', 'SQLite']
  },
  'app4': {
    title: 'Weather App',
    category: 'Mobile App',
    client: 'Weather Services',
    date: 'April 2024',
    url: '#',
    description: 'Real-time weather information with beautiful UI. Get forecasts, alerts, and detailed weather data for any location. Features include hourly forecasts, weather maps, and severe weather alerts.',
    images: ['assets/img/portfolio/weather-app.jpg'],
    features: [
      'Real-time weather data',
      'Hourly forecasts',
      'Weather maps',
      'Severe weather alerts',
      'Multiple location support'
    ],
    technologies: ['Flutter', 'Dart', 'Weather API', 'Geolocator']
  },
  'app5': {
    title: 'Netflix Clone',
    category: 'Product',
    client: 'Entertainment Platform',
    date: 'May 2024',
    url: '#',
    description: 'A streaming application clone featuring movie browsing, watchlist management, and playback controls. Built with modern UI patterns and smooth animations for optimal user experience.',
    images: ['assets/img/portfolio/net.png'],
    features: [
      'Movie browsing',
      'Watchlist management',
      'Video playback',
      'Search functionality',
      'User profiles'
    ],
    technologies: ['Flutter', 'Dart', 'Firebase', 'Video Player']
  },
  'app6': {
    title: 'Kick Reels UI',
    category: 'Branding',
    client: 'Social Media',
    date: 'June 2024',
    url: '#',
    description: 'Modern UI design for a video sharing application. Features swipeable video feeds, social interactions, and content discovery. Focused on engaging user experience and smooth animations.',
    images: ['assets/img/portfolio/app-5.png'],
    features: [
      'Swipeable video feeds',
      'Social interactions',
      'Content discovery',
      'User profiles',
      'Share functionality'
    ],
    technologies: ['Flutter', 'Dart', 'Firebase', 'Animation']
  },
  'app7': {
    title: 'Quiz App UI',
    category: 'Branding',
    client: 'Educational Platform',
    date: 'July 2024',
    url: '#',
    description: 'Interactive quiz application with beautiful UI and engaging animations. Features question categories, score tracking, and leaderboards. Designed for educational content delivery.',
    images: ['assets/img/portfolio/ui.png'],
    features: [
      'Multiple choice questions',
      'Category selection',
      'Score tracking',
      'Leaderboards',
      'Progress indicators'
    ],
    technologies: ['Flutter', 'Dart', 'Provider', 'Animations']
  },
  'app8': {
    title: 'Intelligent Routing System',
    category: 'Mobile App',
    client: 'Logistics Company',
    date: 'August 2024',
    url: '#',
    description: 'Advanced routing system for logistics and delivery management. Uses intelligent algorithms for optimal route planning, real-time tracking, and delivery status updates.',
    images: ['assets/img/portfolio/idt.png'],
    features: [
      'Route optimization',
      'Real-time tracking',
      'Delivery management',
      'Driver notifications',
      'Analytics dashboard'
    ],
    technologies: ['Flutter', 'Dart', 'Google Maps API', 'Firebase']
  },
  'app9': {
    title: 'DevOps Pipelines',
    category: 'Product',
    client: 'Tech Company',
    date: 'September 2024',
    url: '#',
    description: 'Comprehensive DevOps solution for continuous integration and deployment. Streamlines development workflows and automates testing and deployment processes.',
    images: ['assets/img/portfolio/f2.png'],
    features: [
      'CI/CD pipeline automation',
      'Build management',
      'Deployment automation',
      'Performance monitoring',
      'Error tracking'
    ],
    technologies: ['Jenkins', 'Docker', 'Kubernetes', 'AWS']
  }
};

function loadProjectDetails(projectId) {
  const project = portfolioProjects[projectId];
  
  if (project) {
    // Update title and basic info
    document.getElementById('projectTitle').textContent = project.title;
    document.getElementById('projectCategory').textContent = project.category;
    document.getElementById('projectClient').textContent = project.client;
    document.getElementById('projectDate').textContent = project.date;
    document.getElementById('projectURL').href = project.url;
    document.getElementById('projectDescription').textContent = project.description;
    
    // Update slider images
    updateSliderImages(project.images);
    
    // Update features
    updateFeatures(project.features);
    
    // Update technologies
    updateTechnologies(project.technologies);
  } else {
    console.warn('Project not found:', projectId);
  }
}

function updateSliderImages(images) {
  const swiperWrapper = document.getElementById('projectSlider');
  swiperWrapper.innerHTML = '';
  
  images.forEach(img => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `<img src="${img}" alt="Project image">`;
    swiperWrapper.appendChild(slide);
  });
  
  // Reinitialize swiper if it exists
  if (window.Swiper) {
    const swiperElement = document.querySelector('.portfolio-details-slider');
    if (swiperElement && swiperElement.swiper) {
      swiperElement.swiper.update();
    }
  }
}

function updateFeatures(features) {
  const featuresList = document.getElementById('projectFeatures');
  featuresList.innerHTML = '';
  
  features.forEach(feature => {
    const li = document.createElement('li');
    li.innerHTML = `<i class="bi bi-check-circle"></i> <span>${feature}</span>`;
    featuresList.appendChild(li);
  });
}

function updateTechnologies(technologies) {
  const techDiv = document.getElementById('projectTech');
  techDiv.innerHTML = '';
  
  const colors = ['bg-primary', 'bg-success', 'bg-info', 'bg-warning', 'bg-danger'];
  
  technologies.forEach((tech, index) => {
    const span = document.createElement('span');
    span.className = `badge ${colors[index % colors.length]}`;
    span.textContent = tech;
    techDiv.appendChild(span);
  });
}

// Load project on page load
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('project') || 'app1';
  loadProjectDetails(projectId);
});