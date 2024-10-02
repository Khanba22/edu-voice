const router = require("express").Router();

router.get("/getscript", (req, res) => {
  res.json({
    script:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio libero nemo amet cum a itaque nobis repudiandae! Repellendus corrupti est labore commodi ab incidunt assumenda sequi, natus deserunt nemo iste vel eveniet esse autem suscipit impedit vitae sunt molestias minus blanditiis ratione! Quae, in aspernatur aliquid fugiat itaque, culpa eum quis maxime nostrum deserunt neque voluptate. Odit voluptas, in officiis consectetur accusamus ex fugiat numquam repudiandae laboriosam consequuntur commodi hic laudantium inventore porro quisquam dolore perspiciatis nam blanditiis similique, quam quo earum ipsum eos! Ducimus aperiam deserunt inventore esse perspiciatis eveniet commodi dignissimos facere molestiae temporibus enim quos, repellat iusto voluptatum vero voluptate dolore ullam minima fugiat? Cumque, ullam illum at maxime facere repellendus obcaecati similique ducimus esse! Consequuntur dolore unde illo dolorum!",
    notes: [
      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, cumque voluptatum rerum incidunt quo voluptate rem nemo dolores reiciendis quas?",
      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, cumque voluptatum rerum incidunt quo voluptate rem nemo dolores reiciendis quas?",
      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, cumque voluptatum rerum incidunt quo voluptate rem nemo dolores reiciendis quas?",
      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, cumque voluptatum rerum incidunt quo voluptate rem nemo dolores reiciendis quas?",
      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, cumque voluptatum rerum incidunt quo voluptate rem nemo dolores reiciendis quas?",
      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, cumque voluptatum rerum incidunt quo voluptate rem nemo dolores reiciendis quas?",
    ],
    visuals:{

    }
  });
});

module.exports = router;
