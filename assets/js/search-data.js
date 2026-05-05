// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-research",
          title: "research",
          description: "Research themes and active projects in the Fortenbach Lab.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/research/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "Publications from the Fortenbach Lab and related earlier work, in reverse chronological order.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-people",
          title: "people",
          description: "Current members and alumni of the Fortenbach Lab.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/people/";
          },
        },{id: "nav-news",
          title: "news",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/news/";
          },
        },{id: "nav-join",
          title: "join",
          description: "How to apply to the Fortenbach Lab as a postdoc, graduate student, or undergraduate.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/joining/";
          },
        },{id: "nav-patient-resources",
          title: "patient resources",
          description: "Trusted external resources for patients with retinal degenerative disease and the people who care for them. The Fortenbach Lab does not endorse any single organization; this page is a starting point.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/patient-resources/";
          },
        },{id: "nav-press",
          title: "press",
          description: "News stories, press releases, and media coverage about the Fortenbach Lab and our research.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/press/";
          },
        },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "Posts",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "news-placeholder-news-item-replace-with-real-entries-paper-accepted-talk-given-grant-funded-aim-to-add-something-every-1-2-months-so-the-site-does-not-feel-abandoned",
          title: 'Placeholder news item — replace with real entries (paper accepted, talk given, grant...',
          description: "",
          section: "News",},{id: "news-lab-launching-at-the-university-of-washington",
          title: 'Lab launching at the University of Washington',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-the-fortenbach-lab-website-is-live-recruiting-at-all-levels-see-the-join-page",
          title: 'The Fortenbach Lab website is live. Recruiting at all levels — see the...',
          description: "",
          section: "News",},{id: "projects-how-photoswitches-encode-visual-information",
          title: 'How photoswitches encode visual information',
          description: "Single-cell and multi-electrode array recordings of photoswitch-mediated light responses, in retinas at different stages of degeneration.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-retinal-circuits-in-degenerative-disease",
          title: 'Retinal circuits in degenerative disease',
          description: "Basic physiology of the degenerating retina — how circuits remodel, what remains intact, and what any restorative therapy must respect.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-from-bench-to-retina-clinic",
          title: 'From bench to retina clinic',
          description: "Clinical questions that shape the lab&#39;s bench priorities — and bench results that inform clinical practice.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%63%72%66%6F%72%74@%75%77.%65%64%75", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=1sIZy7QAAAAJ", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000-0003-2659-8971", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/cfortenbach", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
