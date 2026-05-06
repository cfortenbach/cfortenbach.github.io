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
          description: "Research themes in the Fortenbach Lab.",
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
      },{id: "news-awarded-the-research-to-prevent-blindness-career-development-award-rpb-s-flagship-award-supporting-four-years-of-work-on-photoswitch-mediated-vision-restoration",
          title: 'Awarded the Research to Prevent Blindness Career Development Award, RPB’s flagship award supporting...',
          description: "",
          section: "News",},{id: "news-uw-medicine-ophthalmology-featured-the-lab-s-photoswitch-research-fortenbach-lab-investigating-the-therapeutic-potential-for-photoswitches-to-restore-vision",
          title: 'UW Medicine Ophthalmology featured the lab’s photoswitch research: Fortenbach Lab investigating the therapeutic...',
          description: "",
          section: "News",},{id: "news-basic-science-grand-rounds-joint-presentation-with-dr-james-kuchenbecker-on-photochemical-restoration-of-vision-augmented-with-assistive-devices",
          title: 'Basic Science Grand Rounds: joint presentation with Dr. James Kuchenbecker on photochemical restoration...',
          description: "",
          section: "News",},{id: "news-phase-1-trial-of-intravitreal-photoswitch-kio-301-benaq-in-advanced-retinitis-pigmentosa-published-in-nature-medicine",
          title: 'Phase 1 trial of intravitreal photoswitch (KIO-301/BENAQ) in advanced retinitis pigmentosa published in...',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_4/";
            },},{id: "news-appointed-adjunct-assistant-professor-in-the-department-of-neurobiology-amp-amp-biophysics-at-the-university-of-washington-supporting-cross-departmental-training-and-research-in-retinal-physiology-and-vision-science",
          title: 'Appointed Adjunct Assistant Professor in the Department of Neurobiology &amp;amp;amp; Biophysics at the...',
          description: "",
          section: "News",},{id: "news-arvo-2026-photochemical-restoration-of-transient-on-and-off-retinal-ganglion-cell-responses-the-talk-covered-our-recent-multi-electrode-array-recordings-characterizing-how-photoswitch-treated-retinas-reconstruct-transient-on-and-off-response-polarity-at-the-level-of-individual-ganglion-cells",
          title: 'ARVO 2026: Photochemical Restoration of Transient ON- and OFF- Retinal Ganglion Cell Responses....',
          description: "",
          section: "News",},{
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
