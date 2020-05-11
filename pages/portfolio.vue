<template>
  <div>
    <section>
      <navbar />
    </section>
    <div class="p-6 bg-gray-200">
      <section>
        <h2 class="text-3xl mb-1">Work History</h2>
        <div>
          <div class="flex flex-wrap mb-4">
            <div
              v-for="work in workHistory"
              :key="work.id"
              class="sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3 h-auto p-1 inline-flex"
            >
              <work-history-card
                :companyName="work.companyName"
                :companyLogo="work.companyLogo"
                :jobTitle="work.jobTitle"
                :dateStart="work.dateStart"
                :dateEnd="work.dateEnd"
                :description="work.description"
                :techUsed="work.techUsed"
                :detailedDescription="work.detailedDescription"
                class="bg-white"
              />
            </div>
          </div>
        </div>

        <h2 class="text-3xl mb-1">Projects</h2>
        <div class="flex flex-wrap mb-4">
          <div
            v-for="project in projects"
            :key="project.id"
            class="sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/4 h-auto mt-4 inline-flex p-1"
          >
            <project-card
              :projectName="project.projectName"
              :projectScreenshot="project.projectScreenshot"
              :altImageText="project.altImageText"
              :projectDescription="project.description"
              :githubLink="project.githubLink"
              :demoLink="project.demoLink"
              class="bg-white"
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
