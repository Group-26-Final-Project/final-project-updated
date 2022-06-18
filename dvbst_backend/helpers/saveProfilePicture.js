const Moralis = require("moralis/node");


async function saveProfilePicture (name, id, picture) {
  try {
    const profilePicObject = Moralis.Object.extend("ProfilePicture");
    var finalProfilePic;
    if (picture && picture.size > 0) {
        const name =
          id.toString().replaceAll("/", "_") +
          "." +
          picture.type.split("/")[1];
        finalProfilePic = new Moralis.File(name, picture);
    }
    if (!finalProfilePic) return;
       
    const query = new Moralis.Query(profilePicObject);
      
    query.equalTo("candidateName", name);
    var result = await query.find();
    if (result.length !== 0) {
    var candidateInfo = result[0].get("profilePicture");
    await candidateInfo.destroy({ useMasterKey: true });

    result[0].set("profilePicture", finalProfilePic);
    const res = await result[0].save();
    // query.equalTo("candidateName", name);
    // var result = await query.find();
    // var newProfile = result[0].get("profilePicture");
    
    console.log("res", res.url());
    return res.url();
    }
    // console.log("result", result[0]);
    // console.log("candidate", result[0].get("candidate"));
    // console.log("count", result[0].get("voteCount"));
    // var electionResult = result[0].get("result");
    const profilePic = new profilePicObject();

    profilePic.set("candidateName", name);
    profilePic.set("candidateId", id);
    profilePic.set("profilePicture", finalProfilePic);
    console.log("finalPP", finalProfilePic);
      await profilePic.save();
      await finalProfilePic.saveIPFS();
      console.log("IPFS URL: ", finalProfilePic.name());
      // setIPFSURL(finalProfilePic.name());
      return finalProfilePic.name();
    
  } catch (err) {
    return err.response.data;
  }
}