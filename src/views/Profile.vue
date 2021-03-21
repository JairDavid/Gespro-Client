<template>
  <v-main>
    <MenuCoordinator />
    <div>
      <UserProfile />
    </div>
  </v-main>
</template>
<script>
import UserProfile from "../components/UserProfile";
import MenuCoordinator from "../components/coordinator components/MenuCoordinator";
export default {
  name: "Profile",
  components: {
    UserProfile,
    MenuCoordinator
  },
};
</script>