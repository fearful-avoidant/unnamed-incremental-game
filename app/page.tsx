import "@root/global-fonts.css";
import "@root/global.css";

import CardDouble from "@components/CardDouble";
import DefaultLayout from "@components/page/DefaultLayout";
import ActionListItem from "@components/ActionListItem";
import Grid from "@components/Grid";
import Row from "@components/Row";
import Badge from "@components/Badge";

export const dynamic = "force-static";

export default function Page() {
  return (
    <DefaultLayout previewPixelSRC="https://intdev-global.s3.us-west-2.amazonaws.com/template-app-icon.png">
      <br />
      <Grid>
        <Row>
          DUNGEON INC. <Badge>v0.1</Badge>
        </Row>
        <Row>A dungeon-themed idle clicker</Row>
      </Grid>

      <Grid>
        <ActionListItem icon="→" href="/unnamed-incremental-game/dungeon">
          Enter the Dungeon
        </ActionListItem>
        <ActionListItem icon="→" href="https://github.com/fearful-avoidant/unnamed-incremental-game" target="_blank">
          Source Code
        </ActionListItem>
      </Grid>
      <br />
    </DefaultLayout>
  );
}
