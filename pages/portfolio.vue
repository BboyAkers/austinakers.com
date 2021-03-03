<template>
  <div class="bg-white-dark">
    <section>
      <navbar />
    </section>
    <div class="p-6 bg-gray-200">
      <section>
        <h2 class="text-3xl mb-1 text-grey">Work History</h2>
        <div class="mb-5">
          <div class="flex flex-col md:grid mx-auto p-2 text-blue-50">
            <!-- right -->
            <div
              v-for="work in workHistory"
              :key="work.id"
              class="flex md:contents"
            >
              <div class="col-start-5 col-end-6 mr-10 md:mx-auto relative">
                <div
                  class="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-blue-lighter shadow"
                ></div>
                <div class="h-full w-6 flex items-center justify-center">
                  <div
                    class="h-full w-1 bg-blue-lighter pointer-events-none"
                  ></div>
                </div>
                <!-- <div
                  class="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-blue-lighter shadow"
                ></div> -->
              </div>
              <div
                class="bg-white col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md max-w-screen-md"
              >
                <div>
                  <!-- Pull image left -->
                  <img
                    :src="work.companyLogo"
                    :alt="work.altImageText"
                    width="150px"
                  />
                </div>

                <!-- Pull text right -->
                <div>
                  <h3 class="font-semibold text-lg mb-1">
                    {{ work.companyName }}
                  </h3>
                  <p>
                    <small>{{ work.dateStart }} - {{ work.dateEnd }}</small>
                  </p>
                  <p class="leading-tight text-justify">
                    {{ work.detailedDescription[0] }}
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Vitae, facilis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-6">
          <div class="col-span-1"></div>
          <div class="col-span-4">
            <div class="grid grid-cols-6 gap-4">
              <div
                v-for="work in workHistory"
                :key="work.id"
                class="col-span-2"
              >
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
