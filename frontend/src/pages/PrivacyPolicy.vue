<template>
  <div>
    <SectionTitle title="Integritetsskyddspolicy" size="large" />
    <p class="my-6 text-center max-w-[80%] mx-auto">
      Vi värnar om din personliga integritet och strävar efter att alltid skydda
      dina personuppgifter på bästa sätt. Denna integritetspolicy hjälper dig
      att förstå vilken typ av personuppgifter vi samlar in och hur de används.
    </p>
    <SectionTitle
      title="Varför vi behandral dina personuppgifter"
      size="small"
    />
    <p class="my-6 text-center max-w-[80%] mx-auto">
      Vi behandlar dina personuppgifter för att kunna erbjuda dig våra tjänster.
      <br />
      Genom att tillhandahålla oss dina personuppgifter kan vi skapa och hantera
      ditt användarkonto, så att du kan använda forumets funktioner.
      <br />
      All information du delger i dina inlägg sparas och kan ses av andra
      användare.

      <br />Vi behandlar dessutom dina uppgifter för att...?
    </p>
    <SectionTitle title="Hur vi behandlar dina personuppgifter" size="small" />
    <p class="my-6 text-center max-w-[80%] mx-auto">
      Vi lagrar dina personuppgifter så länge som det är nödvändigt för att
      uppfylla de ändamål som anges i denna integritetspolicy.
    </p>
  </div>
</template>

<script>
import SectionTitle from '../components/SectionTitle.vue';
export default {
  name: 'PrivacyPolicy',
  components: {
    SectionTitle,
  },
};
</script>

<style></style>
