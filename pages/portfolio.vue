<template>
  <div class="bg-white-dark">
    <section>
      <navbar />
    </section>
    <div class="p-6 bg-gray-200">
      <section>
        <h2 class="text-3xl mb-1 text-grey">Work History</h2>
        <div>
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div v-for="work in workHistory" :key="work.id">
              <work-history-card
                :company-name="work.companyName"
                :company-logo="work.companyLogo"
                :alt-image-text="work.altImageText"
                :job-title="work.jobTitle"
                :date-start="work.dateStart"
                :date-end="work.dateEnd"
                :description="work.description"
                :tech-used="work.techUsed"
                :detailed-description="work.detailedDescription"
              />
            </div>
          </div>
        </div>

        <h2 class="text-3xl mb-1 text-grey">Projects</h2>
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div v-for="project in projects" :key="project.id" class="">
            <project-card
              :project-name="project.projectName"
              :project-screenshot="project.projectScreenshot"
              :alt-image-text="project.altImageText"
              :project-description="project.description"
              :github-link="project.githubLink"
              :demo-link="project.demoLink"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import Navbar from '~/components/Navbar'
import WorkHistoryCard from '~/components/WorkHistoryCard'
import ProjectCard from '~/components/ProjectCard'
import workHistoryData from '~/data/workHistory.json'
import projectsData from '~/data/projects.json'

export default {
  components: {
    Navbar,
    WorkHistoryCard,
    ProjectCard
  },
  data() {
    return {
      workHistory: workHistoryData,
      projects: projectsData
    }
  }
}
</script>
