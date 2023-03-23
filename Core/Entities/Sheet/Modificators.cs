using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Modificators : BaseEntity
    {
        public int StrengthModificator { get; set; }
        public int DexterityModificator { get; set; }
        public int ConstitutionModificator { get; set; }
        public int IntelligenceModificator { get; set; }
        public int WisdomModificator { get; set; }
        public int CharismaModificator { get; set; }
    }
}